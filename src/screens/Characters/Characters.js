import Header from '../../components/Header/Header';
import Character from '../../components/Character/Character';
import SearchBar from '../../components/SearchBar/SearchBar';
import CharacterList from '../../components/CharacterList/CharacterList';
import Button from '../../components/Button/Button';
import PageSection from '../../components/PageSection/PageSection';

import { useState } from 'react';
import { useQuery } from 'react-query';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

// The number of characters shown per page.
const LIMIT = 10;

const Characters = () => {
    const [page, setPage] = useState(1);
    const [searchString, setSearchString] = useState("");

    // The query that handles the fetching, caching, etc of the data from the API
    const {
        status: allCharactersStatus, // Contains either "error", "loading" or "success"
        data: allCharactersData // Contains the data fetched from the API, if request is successful
    } = useQuery(
        // The name of the query and the variables that the query depends on (page here)
        ['allCharacters', page],
        // The function that handles the actual fetching of data from the API
        () => getAllCharacters(page),
        // Show the data of previous page until the data of the new page is fetched
        { keepPreviousData: true }
    )

    const {
        status: searchedCharactersStatus,
        data: searchedCharacters
    } = useQuery(
        ['searchedPeople', searchString],
        () => getSearchedCharacters(searchString, page),
        {
            keepPreviousData: true,
            enabled: searchString.length > 0 // Only execute this query if searchString is non-empty
        }
    );

    let totalPages;

    // If searchString is empty and allCharacters have been fetched, set totalPages to
    // the count of allCharacters (62). Otherwise, if searchString is non-empty and searchedCharacters 
    // have been fetched, set totalPages to 0.
    if (searchString.length === 0 && allCharactersStatus === "success") {
        totalPages = calculatePages(62);
    } else if (searchString.length !== 0 && searchedCharactersStatus === "success") {
        totalPages = 0;
    }

    // The function that executes when the "previous page" button is clicked
    const previousClickHandler = () => {
        setPage(old => Math.max(old - 1, 1));
        window.scrollTo(0, 0);
    }

    // The function that executes when the "next page" button is clicked
    const nextClickHandler = () => {
        setPage(old => Math.min(old + 1, totalPages));
        window.scrollTo(0, 0);
    }

    // The function that executes whenever the input in searchbar changes
    const onSearchChange = e => {
        const searchString = e.currentTarget.value;
        setSearchString(searchString);

        if (page !== 1) {
            setPage(1);
        }
    }

    return (
        <PageSection>
            <Header />

            <div className="flex justify-center mt-5">
                <SearchBar onChange={onSearchChange} />
            </div>

            {/* If searchString is empty and allCharacters have been fetched, show them */}
            {allCharactersStatus === 'success' && searchString.length === 0 && (
                <CharacterList>
                    {allCharactersData.map((character, index) => (
                        <Character
                            key={character.char_id}
                            image={character.img}
                            name={character.name}
                            occupation={character.occupation.join(', ')}
                            birthday={character.birthday}
                            status={character.status}
                            animationDelay={index * 0.1}
                        />
                    ))}
                </CharacterList>
            )}

            {/* If searchString is non-empty and searchedCharacters have been fetched, show them */}
            {searchedCharactersStatus === 'success' && searchString.length > 0 && (
                <CharacterList>
                    {searchedCharacters.map((character, index) => (
                        <Character
                            key={character.char_id}
                            image={character.img}
                            name={character.name}
                            occupation={character.occupation.join(', ')}
                            birthday={character.birthday}
                            status={character.status}
                            animationDelay={index * 0.1}
                        />
                    ))}
                </CharacterList>
            )}

            {/* Only show the page numbers if all characters are being shown */}
            {allCharactersStatus === 'success' && totalPages !== 0 && (
                <div className="flex w-full justify-center items-center mt-3 mb-6 text-gray-200 lg:text-lg">
                    <Button
                        onClick={previousClickHandler}
                        disabled={page === 1}
                    >
                        <ChevronLeftIcon className="w-5 lg:w-8" />
                    </Button>

                    <p className="p-2 mx-7 rounded-full bg-secondary">
                        {page}/{totalPages}
                    </p>

                    <Button
                        onClick={nextClickHandler}
                        disabled={page === totalPages}
                    >
                        <ChevronRightIcon className="w-5 lg:w-8" />
                    </Button>
                </div>
            )}
        </PageSection>
    );
}

/**
 * Fetches paginated characters from the breaking bad api and returns the
 * result in JSON format.
 *
 * @param {*} page
 * @return {*} 
 */
const getAllCharacters = async (page) => {
    // Multiply the LIMIT with the page number - 1 to get the offset
    const data = await fetch(`https://breakingbadapi.com/api/characters?limit=${LIMIT}&offset=${LIMIT * (page - 1)}`);
    return data.json();
}

const getSearchedCharacters = async (searchString) => {
    const data = await fetch(`https://breakingbadapi.com/api/characters?name=${searchString}`);
    return data.json();
}

/**
 * Takes the count of total number of entries and returns the number of pages.
 *
 * @param {number} count
 * @return {*} 
 */
const calculatePages = count => {
    return Math.ceil(count / LIMIT);
}

export default Characters;