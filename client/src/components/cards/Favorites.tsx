import { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useAppSelector } from "../../app/hooks";
import Card from "./Card";
import { LensData } from "../../features/cards/cardSlice";
import { RootState } from "../../app/store";

const Favorites= () => {
const { cards } = useAppSelector((state:RootState) => state.card);
  const favoriteLenses = cards.filter((c: LensData) => c.isFavorite);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLenses = favoriteLenses.filter((lens: LensData) => {
    const matchesCategory =
      selectedCategory === "" || lens.category === selectedCategory;
    const matchesSearch =
      lens.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories:string[] = Array.from(new Set(favoriteLenses.map((lens) => lens.category)));

  return (
    <div>
      <Container className="mt-3 d-flex justify-content-end">
        <Button
          className="btn btn-info text-light"
          onClick={() => setSelectedCategory("")}
          disabled={selectedCategory === ""}
        >
          Clear Category
        </Button>
        <Form.Group className="ml-3">
          <Form.Control
            as="select"
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
        <Form.Group className="ml-3">
          <Form.Control
            type="text"
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
              <Card lens={lens} isFavorite={true} key={lens._id} />
            ))}
          </div>
        ) : (
          <div className="text-center p-xl-4">
            Sorry, there aren't any favorite lenses matching the selected criteria.
          </div>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
