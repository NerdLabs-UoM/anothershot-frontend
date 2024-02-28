import React, { useState } from 'react';
import { PackageCard } from './packageCard';
// import {EditPackages} from './editPackages';

function AddCard() {
    // Define state for storing cards
    const [cards, setCards] = useState<{ src: string; alt: string; width: number; height: number; name: string; description: string; price: number;  }[]>([]);

    // Function to add a new card
    function addCard() {
        setCards(prevCards => [
            ...prevCards,
            {
                src: "/images/cover image.svg",
                alt: `image`,
                width: 260,
                height: 173,
                name: `title1 ${prevCards.length + 1}`,
                description: `title ${prevCards.length + 2}`,
                price: 1000,
                // content2: `Content ${prevCards.length + 2}`,
                // content3: `Content ${prevCards.length + 3}`
            }
        ]);
    }

    return (
        <div>
            {/* New cards added to the packages section */}
            <div className="card-list flex flex-wrap flex-row justify-center">
                {cards.map((card, index) => (
                    <PackageCard
                        key={index}
                        src={card.src}
                        alt={card.alt}
                        width={card.width}
                        height={card.height}
                        name={card.name}
                        description={card.description}
                        price={card.price}
                    // content2={card.content2}
                    // content3={card.content3}
                    />
                ))}
            </div>
        </div>
    );
}

export default AddCard;
