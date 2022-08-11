import { StyledNav, Li, StyledButton } from "./style";

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
        <>
            <li>
              <StyledButton onClick={() => backward(currentPage)}>Previous</StyledButton>
            </li>
            {pageNumbers &&
              pageNumbers.map((number) => (
                <li key={number}>
                  <StyledButton onClick={() => paginated(number)}>{number}</StyledButton>
                </li>
              ))}
            <li>
              <StyledButton onClick={() => forward(currentPage)}>Next</StyledButton>
            </li>
        </>
      )}
    </StyledNav>
  );
}

export default Paginated;
