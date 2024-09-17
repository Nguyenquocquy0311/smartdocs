import Link from "next/link"

const Logo = () => {
  return (
    <Link className="flex space-x-4 items-center logo-font" href="/">
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" draggable="false" alt="logo" width={36} />
        <span className="font-bold text-xl text-black">SMARTDOCS</span>
    </Link>
  )
}

export default Logo;
