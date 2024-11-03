import { icons } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"
import { buttonVariants } from "./ui/button"

type NavItem = {
  label: string
  icon: keyof typeof icons
  href: string
}

interface Props {
  title: string
  items: NavItem[]
}
const Nav = ({ title, items }: Props) => {
  const pathname = usePathname()
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-muted-foreground text-sm">{title}</h2>
      <ul className="grid gap-1">
        {items.map((item) => {
          const active = item.href === pathname
          const Icon = icons[item.icon]

          return (
            <li key={item.href}>
              <Link
                className={buttonVariants({
                  variant: active ? "secondary" : "ghost",
                  className: "w-full !justify-start",
                })}
                href={item.href}
              >
                <Icon />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Nav
