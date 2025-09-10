type PaginationLinkType = {
  page: number;
  ellipsis: boolean;
  active: boolean;
};

export function generatePaginationLinks(
  currentPage: number,
  totalPages: number
): Array<PaginationLinkType> {
  const links: Array<PaginationLinkType> = [];

  if (totalPages < 1) {
    return links;
  }

  const addPageLink = (page: number, isActive: boolean) => {
    links.push({ page, ellipsis: false, active: isActive });
  };

  const addEllipsis = () => {
    if (links.length && !links[links.length - 1].ellipsis) {
      links.push({ page: -1, ellipsis: true, active: false });
    }
  };

  // Add the first page
  addPageLink(1, currentPage === 1);

  // Add ellipsis before the current range
  if (currentPage > 3) {
    addEllipsis();
  }

  // Add the range around the current page
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);
  for (let i = startPage; i <= endPage; i++) {
    addPageLink(i, currentPage === i);
  }

  // Add ellipsis after the current range
  if (currentPage < totalPages - 2) {
    addEllipsis();
  }

  // Add the last page
  if (totalPages > 1) {
    addPageLink(totalPages, currentPage === totalPages);
  }

  return links;
}
