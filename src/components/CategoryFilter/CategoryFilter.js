const CategoryFilter = props => (
    <select
        className="rounded-xl m-2 lg:my-0 w-11/12 md:w-9/12 lg:w-auto bg-tertiary text-white focus:ring-0 focus:ring-primary 
        border-none"
        onChange={props.onChange}
        defaultValue=""
    >
        <option value="" disabled hidden>Category</option>
        <option value="">All</option>
        <option value="Breaking+Bad">Breaking Bad</option>
        <option value="Better+Call+Saul">Better Call Saul</option>
    </select>
);

export default CategoryFilter;