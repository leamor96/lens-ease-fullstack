import { useEffect, useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Card from "./Card";
import { RootState } from "../../app/store";
import { useMediaQuery } from "react-responsive";
import "./Cards.css";
import { LensData } from "../../@types";
import { fetchFavoriteLenses } from "../../features/cards/cardSlice";

const Favorites = () => {
  const { cards } = useAppSelector((state: RootState) => state.card);
  const favoriteLenses = cards.filter((c: LensData) => c.isFavorite);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery({ maxWidth: 768 });
  
  

  const filteredLenses = favoriteLenses.filter((lens: LensData) => {
    const matchesCategory =
      selectedCategory === "" || lens.category === selectedCategory;
    const matchesSearch = lens.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories: string[] = Array.from(
    new Set(favoriteLenses.map((lens) => lens.category))
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoriteLenses()); // Dispatch the fetchFavoriteLenses action when the component mounts
  }, [dispatch]);

  return (
    <div className="bg-cards">
      <Container className="d-flex justify-content-end p-3 sort-section">
        <Button
          className="btn category-btn btn-warning m-1"
          onClick={() => setSelectedCategory("")}
          disabled={selectedCategory === ""}
        >
          Clear Category
        </Button>
        <Form.Group className="ml-3 m-1">
          <Form.Control
            as="select"
            className="select-option"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {isMobile && <div></div>}
        <Form.Group className="ml-3 m-1">
          <Form.Control
            type="text"
            className="search-box"
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
      </Container>
      <Container>
        <h2 className="text-center p-xl-1 mt-3 mt-md-0">My Favorite Lenses</h2>
        {filteredLenses.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {filteredLenses.map((lens: LensData) => (
              <Card
                lens={lens}
                key={lens._id}
                token={localStorage.getItem("token") || ""}
              />
            ))}
            <br />
          </div>
        ) : (
          <div className="text-center p-xl-4">
            Sorry, there aren't any favorite lenses matching the selected
            criteria.
            <div className="content-size"></div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
