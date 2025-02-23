// On crée la collection users
db.createCollection("posts");

// On insère les données dans la collection users.
db.posts.insertMany([
  {
    title: "Un nouveau départ",
    body: "La vie m'a donné une seconde chance, je ne compte pas la gâcher.",
    image: "https://example.com/valjean1.jpg",
    user_id: "67bb012ad06ae0ab58544ca7",
    created_at: "2025-02-23T08:30:00Z",
    updated_at: "2025-02-23T08:30:00Z"
  },
  {
    title: "Les souvenirs d'un père",
    body: "Cosette a changé ma vie, elle est ma plus grande fierté.",
    image: "https://example.com/valjean2.jpg",
    user_id: "67bb012ad06ae0ab58544ca7",
    created_at: "2025-02-23T09:15:00Z",
    updated_at: "2025-02-23T09:15:00Z"
  },
  {
    title: "Mon enfance volée",
    body: "Les Thénardier m'ont fait souffrir, mais mon père m'a sauvée.",
    image: "https://example.com/cosette1.jpg",
    user_id: "67bb012ad06ae0ab58544ca8",
    created_at: "2025-02-23T10:45:00Z",
    updated_at: "2025-02-23T10:45:00Z"
  },
  {
    title: "L'espoir d'un avenir heureux",
    body: "Marius et moi avons tant de rêves à réaliser ensemble.",
    image: "https://example.com/cosette2.jpg",
    user_id: "67bb012ad06ae0ab58544ca8",
    created_at: "2025-02-23T11:30:00Z",
    updated_at: "2025-02-23T11:30:00Z"
  },
  {
    title: "Mes idéaux républicains",
    body: "Je veux me battre pour un monde plus juste et équitable.",
    image: "https://example.com/marius1.jpg",
    user_id: "67bb012ad06ae0ab58544ca9",
    created_at: "2025-02-23T12:00:00Z",
    updated_at: "2025-02-23T12:00:00Z"
  },
  {
    title: "L'amour m'a transformé",
    body: "Avant, je ne pensais qu'à la politique. Maintenant, j'ai trouvé l'amour.",
    image: "https://example.com/marius2.jpg",
    user_id: "67bb012ad06ae0ab58544ca9",
    created_at: "2025-02-23T13:20:00Z",
    updated_at: "2025-02-23T13:20:00Z"
  },
  {
    title: "Un homme traqué",
    body: "Javert ne me laissera jamais en paix, mais je ne cesserai de fuir.",
    image: "https://example.com/valjean3.jpg",
    user_id: "67bb012ad06ae0ab58544ca7",
    created_at: "2025-02-23T14:10:00Z",
    updated_at: "2025-02-23T14:10:00Z"
  },
  {
    title: "Les promenades parisiennes",
    body: "Rien n'est plus apaisant qu'une balade au Jardin du Luxembourg.",
    image: "https://example.com/cosette3.jpg",
    user_id: "67bb012ad06ae0ab58544ca8",
    created_at: "2025-02-23T15:00:00Z",
    updated_at: "2025-02-23T15:00:00Z"
  },
  {
    title: "Les combats de la barricade",
    body: "Je n'oublierai jamais la bravoure de mes camarades.",
    image: "https://example.com/marius3.jpg",
    user_id: "67bb012ad06ae0ab58544ca9",
    created_at: "2025-02-23T16:45:00Z",
    updated_at: "2025-02-23T16:45:00Z"
  },
  {
    title: "L'humanité avant tout",
    body: "Peu importe les lois, c'est la compassion qui nous définit.",
    image: "https://example.com/valjean4.jpg",
    user_id: "67bb012ad06ae0ab58544ca7",
    created_at: "2025-02-23T18:00:00Z",
    updated_at: "2025-02-23T18:00:00Z"
  }
]);