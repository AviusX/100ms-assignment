import PageSection from '../../components/PageSection/PageSection';

import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const CharacterDetails = () => {
    const params = useParams();
    const name = params.name.replace(' ', '+')

    // Get information about the character
    const {
        status: characterStatus,
        data: characterData
    } = useQuery(
        "characterDetails",
        () => getCharacter(name),
        // Don't refetch data everytime the window is re-focused,
        // since the data is unlikely to change frequently.
        { refetchOnWindowFocus: false }
    )

    // Get quotes by the character
    const {
        status: quotesStatus,
        data: quotesData
    } = useQuery(
        "quotes",
        () => getQuotes(name),
        { refetchOnWindowFocus: false }
    )

    let statusColor;
    if (characterStatus === 'success') {
        if (characterData[0].status.toLowerCase().includes("dead")
            || characterData[0].status.toLowerCase().includes("deceased")) {
            statusColor = "text-spoiler-red";
        } else {
            statusColor = "text-primary";
        }
    }

    return (
        <PageSection>
            {/* Show the following only if characterDetails have been fetched successfully */}
            {characterStatus === 'success' && (
                <>
                    {/* Header */}
                    <div className="flex flex-wrap bg-tertiary px-2 lg:px-5 py-5 lg:py-10">
                        {/* Character Image */}
                        <div className="h-20 w-20 lg:h-60 lg:w-60 rounded-full mr-5 overflow-hidden">
                            <img src={characterData[0].img} alt="Character" />
                        </div>

                        {/* Name and Nickname */}
                        <div className="flex flex-col justify-center space-y-3 mx-2 lg:mx-5">
                            <h2 className="text-primary text-xl lg:text-4xl">
                                {characterData[0].name}
                            </h2>
                            <h2 className="text-gray-400 text-xl lg:text-4xl">
                                A.K.A {characterData[0].nickname}
                            </h2>
                        </div>

                        {/* Status */}
                        <div className="flex-1 flex justify-end items-center w-full lg:w-auto mt-4">
                            <p className={`text-lg lg:text-2xl px-4 py-2 lg:py-3 ${statusColor} font-semibold bg-bg rounded-full`}>
                                {characterData[0].status}
                            </p>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="bg-secondary w-full lg:w-8/12 lg:rounded-xl self-center py-3 px-4 my-4">
                        {/* Born and played by */}
                        <div className="flex flex-wrap justify-around my-3">
                            <div className="flex flex-col space-y-1 text-center">
                                <h3 className="text-xl text-primary uppercase tracking-widest font-semibold">
                                    Born
                                </h3>
                                <p className="text-white">
                                    {characterData[0].birthday}
                                </p>
                            </div>
                            <div className="flex flex-col space-y-1 text-center">
                                <h3 className="text-xl text-primary uppercase tracking-widest font-semibold">
                                    Played by
                                </h3>
                                <p className="text-white">
                                    {characterData[0].portrayed}
                                </p>
                            </div>
                        </div>

                        {/* Occupation */}
                        <div className="flex flex-col text-center space-y-1 my-3">
                            <h3 className="text-primary text-xl uppercase tracking-widest font-semibold">
                                Occupation
                            </h3>
                            <p className="text-white">
                                {characterData[0].occupation.join(', ')}
                            </p>
                        </div>

                        {/* Seasons */}
                        <div className="flex flex-col text-center space-y-1 my-3">
                            <h3 className="text-primary text-xl uppercase tracking-widest font-semibold">
                                Seasons
                            </h3>
                            <p className="text-white">
                                {characterData[0].appearance.join(', ')}
                            </p>
                        </div>

                        {/* Quotes */}
                        {/* (Show this only if they've been successfully fetched and the character has them) */}
                        {quotesStatus === 'success' && quotesData.length > 0 && (
                            <div className="flex flex-col text-center space-y-1 my-3">
                                <h3 className="text-primary text-xl uppercase tracking-widest font-semibold">
                                    Quotes
                                </h3>
                                <div className="flex flex-col space-y-3">
                                    {quotesData.map(quote => (
                                        <p className="text-white even:text-yellow-100 italic" key={quote.quote_id}>
                                            <span className="text-primary font-bold text-xl mx-1">
                                                "
                                            </span>
                                            {quote.quote}
                                            <span className="text-primary font-bold text-xl mx-1">
                                                "
                                            </span>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
            {characterStatus === 'loading' && (
                <h1 className="text-primary text-3xl text-center my-10">Loading</h1>
            )}
            {characterStatus === 'error' && (
                <h1 className="text-spoiler-red text-3xl text-center my-10">
                    Sorry, there was an error while fetching the data. Please try again.
                </h1>
            )}
        </PageSection>
    );
}

const getCharacter = async (name) => {
    const data = await fetch(`https://breakingbadapi.com/api/characters?name=${name}`);
    return data.json();
}

const getQuotes = async (name) => {
    const data = await fetch(`https://breakingbadapi.com/api/quote?author=${name}`)
    return data.json();
}

export default CharacterDetails;