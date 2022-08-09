import { StyledNav, Li } from "./style";

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
            <Li>
              <button onClick={() => backward(currentPage)}>Previous</button>
            </Li>
            {pageNumbers &&
              pageNumbers.map((number) => (
                <Li>
                  <button onClick={() => paginated(number)}>{number}</button>
                </Li>
              ))}
            <Li>
              <button onClick={() => forward(currentPage)}>Next</button>
            </Li>
        </>
      )}
    </StyledNav>
  );
}

export default Paginated;
