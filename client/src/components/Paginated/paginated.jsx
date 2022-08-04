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
    <nav>
      {pageNumbers[0] && (
        <div>
          <ul>
            <li>
              <button onClick={() => backward(currentPage)}>Previous</button>
            </li>
            {pageNumbers &&
              pageNumbers.map((number) => (
                <li>
                  <button onClick={() => paginated(number)}>{number}</button>
                </li>
              ))}
            <li>
              <button onClick={() => forward(currentPage)}>Next</button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Paginated;
