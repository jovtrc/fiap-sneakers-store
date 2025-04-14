import React from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui'

export function Breadcrumbs({
  items,
}: {
  items: { title: string; href: string }[]
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          if (index === items.length - 1) {
            return (
              <BreadcrumbItem data-testid="breadcrumb-item" key={index}>
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              </BreadcrumbItem>
            )
          }

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem data-testid="breadcrumb-item">
                <BreadcrumbLink data-testid="breadcrumb-link" href={item.href}>
                  {item.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {index !== items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
