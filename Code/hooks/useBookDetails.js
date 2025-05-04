import { useState, useEffect } from 'react';  
export function useBookDetails(bookId, title, author, category) {

  // Defining two hooks one for loading and one for book details 
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      setTimeout(() => {
        const response = {
          // Simulate API call
          id: bookId,
          title: title,
          author: author,
          genre: category,
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1602190253i/52578297.jpg",
          available: true,
          copiesLeft: 12,
          isbn: "978-0525559474",
          published: "September 29, 2020",
          pages: 304,
          language: "English",
          returnDate: "Feb 21, 2024",
          description: `Between life and death...\n`,
        };
        setBook(response);
        setLoading(false);
      }, 1000);
    }

    fetchBook();
  }, [bookId]);

  return { book, loading };
}