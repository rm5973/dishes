import React, { useState, useEffect } from "react";
import { database } from "./firebaseConfig";
import { ref, onValue, update } from "firebase/database";

const Menu = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const dishesRef = ref(database, "dishes");
    onValue(dishesRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Fetched data from Firebase:", data);
      if (data) {
        setDishes(Object.entries(data).map(([key, dish]) => ({ ...dish, key })));
      } else {
        setDishes([]);
      }
    });
  }, []);

  const togglePublished = (key, isPublished) => {
    const dishRef = ref(database, `dishes/${key}`);
    update(dishRef, { isPublished: !isPublished }).then(() => {
      setDishes((prevDishes) =>
        prevDishes
          .map((dish) =>
            dish.key === key ? { ...dish, isPublished: !isPublished } : dish
          )
          .filter((dish) => dish.isPublished)
      );
    });
  };

  return (
    <div>
      <h1>Menu</h1>
      <div style={styles.menuContainer}>
        {dishes.map((dish) => (
          dish.isPublished && ( // Display only if the dish is published
            <div key={dish.dishId} style={styles.card}>
              <h2 style={styles.cardTitle}>{dish.dishName}</h2>
              <img src={dish.imageUrl} alt={dish.dishName} style={styles.cardImage} />
              <button onClick={() => togglePublished(dish.key, dish.isPublished)}>
                {dish.isPublished ? "Unpublish" : "Publish"}
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

const styles = {
  menuContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '20px',
  },
  card: {
    width: '20%',
    height: '20%',
    boxSizing: 'border-box',
    margin: '10px',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardTitle: {
    marginBottom: '10px',
  },
  cardImage: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
    borderRadius: '8px',
  },
};

export default Menu;
