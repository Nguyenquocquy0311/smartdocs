import { routes } from "@/constant/routes";
import { useRouter } from "next/router";
import { useCallback } from "react";

const Logo = () => {
  const router = useRouter();

  const redirectToHome = useCallback(() => {
    const navigate = () => {
      router.push(routes.home);
    };
    navigate();
  }, [router]);

  return (
    <div
      className="flex items-center cursor-pointer space-x-2 sm:space-x-4 logo-font"
      onClick={redirectToHome}
    >
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        draggable="false"
        alt="logo"
        width={36}
      />
      <span className="font-bold text-xl text-black">
        SMARTDOCS
      </span>
    </div>
  );
};

export default Logo;
