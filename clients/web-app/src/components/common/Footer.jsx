const Footer = () => {
  return (
    <footer className="mt-20 border-t pt-10 pb-6 text-sm text-gray-500">
      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
        
        <div>
          <h3 className="font-semibold mb-3">SmartCart</h3>
          <p>AI-powered shopping experience.</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <p>About</p>
          <p>Careers</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <p>Help Center</p>
          <p>Contact</p>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Legal</h3>
          <p>Privacy</p>
          <p>Terms</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;