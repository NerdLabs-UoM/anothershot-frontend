import React, { useState } from 'react';
import {PackageCard} from './packageCard';
import { Card } from '@/components/ui/card';

const PackageList: React.FC = () => {
    const [cards, setCards] = useState<{ src:string; alt:string; width:number; height:number;  title1: string; title2: string; content1: string; content2: string; content3: string }[]>([]);

    // Function to add a new card
    const addCard = () => {
        setCards(prevCards => [
            ...prevCards,
            { src: `/images/close-up-recording-video-with-smartphone-during-concert-toned-picture 1.png`, alt: `image`, width:260 ,height:173 ,title1: `title ${prevCards.length + 1}`,  title2: `title ${prevCards.length + 2}`,content1: `Content ${prevCards.length + 1}`,content2: `Content ${prevCards.length + 2}` ,content3: `Content ${prevCards.length + 3}` }
        ]);
    };

    return (
        <div>
            <button className="ml-72 bg-gray-400"onClick={addCard}>Add Card</button>
            <div className="card-list flex flex-wrap flex-row justify-center">
                {cards.map((card, index) => (
                    <PackageCard key={index} src={card.src} alt={card.alt} width={card.width} height={card.height}  title1={card.title1}  title2={card.title2} content1={card.content1} content2={card.content2} content3={card.content3} />
                ))}
            </div>
        </div>
    );
};

export default PackageList;
