export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>
          <strong>1964–1970 Mustang Parts Guide</strong>
        </span>
        <span>Data is enthusiast-curated; verify fitment with the manufacturer.</span>
        <span>© {year}</span>
      </div>
    </footer>
  );
}
