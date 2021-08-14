import { SearchIcon } from '@heroicons/react/outline';

const SearchBar = props => (
    <div className="flex w-11/12 md:w-9/12 lg:w-8/12 xl:w-4/12 h-10 py-1 px-2 rounded-xl bg-tertiary text-gray-200">
        <div className="flex items-center mx-1">
            <SearchIcon className="h-5 text-gray-400" />
        </div>
        <input type="text"
            className="flex-1 p-2 border-none focus:outline-none focus:ring-0 bg-transparent"
            placeholder="Search"
            onChange={props.onChange}
        />
    </div>
)

export default SearchBar;