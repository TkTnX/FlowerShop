import { Search, SortDesc } from "lucide-react";
import { Block } from "../shared";
import { useSearchParams } from "react-router-dom";

export const ShopFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const onSearchChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search");

    setSearchParams({ ...params, title: search as string });
  };

  const onOrderByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orderBy = e.target.value;

    setSearchParams({ ...params, orderBy });
  };

  return (
    <Block className="shop__filters">
      <form onSubmit={(e) => onSearchChange(e)} className="shop__search">
        <input
          name="search"
          placeholder="Search..."
          className="shop__input"
          type="text"
        />
        <button className="shop__button">
          <Search />
        </button>
      </form>

      <label className="shop__sort">
        <SortDesc color="var(--main-color)" />
        <select onChange={onOrderByChange}>
          <option value="" selected hidden>
            Order by:
          </option>
          <option value="price">More expensive</option>
          <option value="-price">Cheeper</option>
          <option value="rating">More rated</option>
          <option value="-rating">Less rated</option>
        </select>
      </label>
    </Block>
  );
};
