import Link from "next/link";
import { LuGraduationCap } from "react-icons/lu";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
        <LuGraduationCap size={22} />
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold text-slate-900">
          Skill<span className="text-blue-600">Hub</span>
        </span>

        <span className="text-xs text-slate-500">
          Learn • Grow • Succeed
        </span>
      </div>
    </Link>
  );
};

export default Logo;