"use client"
import React, { Fragment } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import Link from "next/link"

type BreadcrumbItemType =
  | {
      label: string
      href: string
    }
  | string

interface Props {
  items: BreadcrumbItemType[]
}

const PageHeader = ({ items }: Props) => {
  return (
    <div className="flex h-9 items-center">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item) => {
            if (typeof item === "string") {
              return (
                <Fragment key={item}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item}</BreadcrumbPage>
                  </BreadcrumbItem>
                </Fragment>
              )
            }
            return (
              <Fragment key={item.href}>
                <BreadcrumbSeparator />
                <BreadcrumbLink asChild>
                  <Link href={item.href}>{item.label}</Link>
                </BreadcrumbLink>
              </Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

export default PageHeader
