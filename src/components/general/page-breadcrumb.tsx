import { isMatch, useMatches } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import React from "react";
import { nanoid } from "nanoid";

const PageBreadcrumb = () => {
  const matches = useMatches();

  const matchesWithCrumbs = matches.filter((match) =>
    isMatch(match, "loaderData.crumb")
  );

  const items = matchesWithCrumbs.map(({ pathname, loaderData }) => {
    return {
      href: pathname,
      label: loaderData?.crumb,
    };
  });

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {items.map((item, index) => {
            if (items.length - 1 === index) {
              return (
                <React.Fragment key={nanoid()}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                </React.Fragment>
              );
            }
            return (
              <React.Fragment key={nanoid()}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default PageBreadcrumb;
