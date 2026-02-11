import { Link } from "react-router-dom";
import Logo from "./components/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#05080F] border-t border-white/5 py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <Logo size="small" />
              <h3 className="text-sm font-black text-white font-heading uppercase tracking-tighter">
                FCT <span className="text-primary-light">POS</span> TAXATION
              </h3>
            </div>
            <p className="text-xs font-medium text-white/30 leading-relaxed uppercase tracking-wider">
              Enforcing transparent fiscal monitoring and automated tax collection protocols for the Federal Capital Territory.
            </p>
          </div>

          <div>
             <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">Navigation</h3>
             <ul className="space-y-4">
                <li><a href="#home" className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest transition-all">Home</a></li>
                <li><a href="#features" className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest transition-all">Features</a></li>
                <li><a href="#contact" className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest transition-all">Contact</a></li>
             </ul>
          </div>

          <div>
             <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">Quick Access</h3>
             <ul className="space-y-4">
                <li><Link to="/register" className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest transition-all">Register</Link></li>
                <li><Link to="/login" className="text-xs font-bold text-white/80 hover:text-white uppercase tracking-widest transition-all">Log In</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="text-[10px] font-black text-white/80 uppercase tracking-[0.3em] mb-8">About System</h3>
             <div className="glass-card p-4 border-white/5 bg-white/5">
                <p className="text-[9px] font-black text-primary-high uppercase tracking-widest mb-1">Status: Online</p>
                <p className="text-[8px] font-medium text-white/80 uppercase tracking-widest leading-none">V 2.0.4 "Bold Edition"</p>
             </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
           <p className="text-[9px] font-bold text-white/80 uppercase tracking-[0.2em]">
             &copy; {new Date().getFullYear()} FCT POS Tax System. All rights reserved.
           </p>
           <div className="flex space-x-8 text-[9px] font-bold text-white/80 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-all">Terms of Service</a>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
