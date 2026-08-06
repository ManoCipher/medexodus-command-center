import os
import fitz # PyMuPDF
import io
from PIL import Image
import urllib.request
from html.parser import HTMLParser
import re

def process_pdf(pdf_path, output_md_path, assets_dir):
    os.makedirs(assets_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    print(f"Opened PDF: {pdf_path}, Pages: {len(doc)}")
    
    md_lines = [f"# MedExodus - Full Platform Overview\n", f"*Extracted from `{os.path.basename(pdf_path)}` ({len(doc)} pages)*\n\n---\n"]
    
    image_count = 0
    for page_num in range(len(doc)):
        page = doc[page_num]
        md_lines.append(f"\n## Page {page_num + 1}\n")
        
        # Extract text
        text = page.get_text("text")
        if text.strip():
            md_lines.append(text.strip() + "\n")
        
        # Extract images
        image_list = page.get_images(full=True)
        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            try:
                pil_img = Image.open(io.BytesIO(image_bytes))
                # If image is reasonably sized (not tiny 1x1 spacer)
                if pil_img.width > 30 and pil_img.height > 30:
                    image_count += 1
                    # Resize if extremely large to save space/memory
                    max_dim = 1600
                    if max(pil_img.size) > max_dim:
                        pil_img.thumbnail((max_dim, max_dim), Image.Resampling.LANCZOS)
                    
                    img_filename = f"page_{page_num+1}_img_{img_index+1}.{image_ext if image_ext in ['png', 'jpg', 'jpeg', 'webp'] else 'png'}"
                    img_save_path = os.path.join(assets_dir, img_filename)
                    pil_img.save(img_save_path)
                    
                    md_lines.append(f"\n![Page {page_num+1} Image {img_index+1} ({pil_img.width}x{pil_img.height})](./extracted_assets/{img_filename})\n")
            except Exception as e:
                print(f"Error processing image {img_index} on page {page_num+1}: {e}")
                
    with open(output_md_path, "w", encoding="utf-8") as f:
        f.write("\n".join(md_lines))
    print(f"Successfully converted PDF to Markdown: {output_md_path}")
    print(f"Extracted {image_count} images into: {assets_dir}")

class SimpleHTMLTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.result = []
        self.in_script = False
        self.in_style = False
        self.links = []
        self.headings = []
        self.current_tag = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag in ['script', 'style', 'noscript']:
            self.in_script = True
        if tag == 'a':
            attrs_dict = dict(attrs)
            href = attrs_dict.get('href')
            if href:
                self.links.append((href, attrs_dict.get('title', '')))
        if tag in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.result.append(f"\n\n{'#' * int(tag[1])} ")

    def handle_endtag(self, tag):
        if tag in ['script', 'style', 'noscript']:
            self.in_script = False
        if tag in ['p', 'div', 'section', 'article', 'li', 'br', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            self.result.append("\n")

    def handle_data(self, data):
        if not self.in_script:
            text = data.strip()
            if text:
                self.result.append(text + " ")

    def get_text(self):
        full_text = "".join(self.result)
        # Clean up excessive newlines
        full_text = re.sub(r'\n\s*\n+', '\n\n', full_text)
        return full_text

def fetch_and_clean_url(url, output_path):
    print(f"Fetching {url}...")
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            html_content = response.read().decode('utf-8', errors='ignore')
            
        parser = SimpleHTMLTextExtractor()
        parser.feed(html_content)
        cleaned_text = parser.get_text()
        
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(f"# Analysis of {url}\n\n")
            f.write("## Extracted Clean Content & Structure\n\n")
            f.write(cleaned_text)
            f.write("\n\n## Important Navigation & Internal Links\n\n")
            seen = set()
            for href, title in parser.links:
                if href and href not in seen and not href.startswith('#') and not href.startswith('javascript:'):
                    seen.add(href)
                    f.write(f"- {href} {f'({title})' if title else ''}\n")
                    
        print(f"Saved website extraction to: {output_path}")
    except Exception as e:
        print(f"Error fetching URL: {e}")

if __name__ == "__main__":
    pdf_path = r"c:\Projects\Linkedin Projects\medexodus-command-center\docs\MedExodus_Full_Platform_Overview.pdf"
    output_md = r"c:\Projects\Linkedin Projects\medexodus-command-center\docs\MedExodus_Full_Platform_Overview.md"
    assets_dir = r"c:\Projects\Linkedin Projects\medexodus-command-center\docs\extracted_assets"
    web_md = r"c:\Projects\Linkedin Projects\medexodus-command-center\docs\access_healthcare_analysis.md"
    
    if os.path.exists(pdf_path):
        process_pdf(pdf_path, output_md, assets_dir)
    else:
        print(f"PDF not found at {pdf_path}")
        
    fetch_and_clean_url("https://www.accesshealthcare.com/", web_md)
