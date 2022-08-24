import { StyledNav, Li, StyledLi } from "./style";

function Paginated({
  setCurrentPage,
  currentPage,
  elementsPerPage,
  totalElements,
  paginated,
}) {
  const pageNumbers = [];

  for (
    let number = 1;
    number <= Math.ceil(totalElements / elementsPerPage);
    number++
  ) {
    pageNumbers.push(number);
  }

  const forward = (pageNumber) => {
    setCurrentPage(
      pageNumber === pageNumbers.length ? pageNumber : pageNumber + 1
    );
  };

  const backward = (pageNumber) => {
    setCurrentPage(pageNumber === 1 ? pageNumber : pageNumber - 1);
  };

  return (
    <StyledNav>
      {pageNumbers[0] && (
        <ul className="flex">
          <StyledLi onClick={() => backward(currentPage)}>Previous</StyledLi>
          {pageNumbers &&
            pageNumbers.map((number) => {
              if (currentPage === number)
                return (
                  <li
                    className="py-1 px-3 m-1 flex text-centerrounded shadow-lg border-b-4 border-secondary rounded-lg"
                    key={number}
                    onClick={() => paginated(number)}
                  >
                    {number}
                  </li>
                );
              else
                return (
                  <StyledLi key={number} onClick={() => paginated(number)}>
                    {number}
                  </StyledLi>
                );
            })}
          <StyledLi onClick={() => forward(currentPage)}>Next</StyledLi>
        </ul>
      )}
    </StyledNav>
  );
}

export default Paginated;
