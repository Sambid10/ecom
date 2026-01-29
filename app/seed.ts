import config from "@payload-config"
import { getPayload, Payload } from "payload";
const categories = [
    {
        name: "All",
        slug: "all",
    },
    {
        name: "Albums",
        slug: "albums",
        subcategories: [
            { name: "Mini Albums (EP)", slug: "mini-albums" },
            { name: "Full Albums", slug: "full-albums" },
            { name: "Single Albums", slug: "single-albums" },
            { name: "Repackages", slug: "repackages" },
            { name: "Compilation", slug: "compilation" },
        ],
    },
    {
        name: "Lightsticks",
        slug: "lightsticks",
        subcategories: [
            { name: "Official Lightsticks", slug: "official-lightsticks" },
            { name: "Lightstick Accessories", slug: "lightstick-accessories" },
        ],
    },
    {
        name: "Merch",
        slug: "merch",
        subcategories: [
            { name: "Photocards", slug: "photocards" },
            { name: "Posters", slug: "posters" },
            { name: "Keychains", slug: "keychains" },
            { name: "Stickers", slug: "stickers" },
            { name: "Badges & Pins", slug: "badges-pins" },
            { name: "Lomo Cards", slug: "lomo-cards" },
            { name: "Standees", slug: "standees" },
        ],
    },
    {
        name: "Clothing",
        slug: "clothing",
        subcategories: [
            { name: "T-Shirts", slug: "t-shirts" },
            { name: "Hoodies", slug: "hoodies" },
            { name: "Sweatshirts", slug: "sweatshirts" },
            { name: "Caps & Beanies", slug: "caps-beanies" },
        ],
    },
    {
        name: "Accessories",
        slug: "accessories",
        subcategories: [
            { name: "Bags & Pouches", slug: "bags-pouches" },
            { name: "Jewelry", slug: "jewelry" },
            { name: "Phone Cases", slug: "phone-cases" },
            { name: "Photocard Binders", slug: "photocard-binders" },
        ],
    },
    {
        name: "Stationery",
        slug: "stationery",
        subcategories: [
            { name: "Notebooks", slug: "notebooks" },
            { name: "Calendars", slug: "calendars" },
            { name: "Photo Books", slug: "photo-books" },
            { name: "Planners", slug: "planners" },
        ],
    },
    {
        name: "Concert & Events",
        slug: "concert-events",
        subcategories: [
            { name: "Tour Merch", slug: "tour-merch" },
            { name: "Banners", slug: "banners" },
            { name: "Fan Kits", slug: "fan-kits" },
        ],
    },
    {
        name: "Digital",
        slug: "digital",
        subcategories: [
            { name: "Digital Albums", slug: "digital-albums" },
            { name: "Digital Photocards", slug: "digital-photocards" },
            { name: "Live Tickets (Online)", slug: "live-tickets" },
        ],
    },
    {
        name: "Other",
        slug: "other",
    },

    // ---- Added 10 new categories below ----

    {
        name: "Magazines",
        slug: "magazines",
        subcategories: [
            { name: "K-POP Magazines", slug: "kpop-magazines" },
            { name: "Fashion Magazines", slug: "fashion-magazines" },
            { name: "Photobook Issues", slug: "photobook-issues" },
        ],
    },
    {
        name: "Season's Greetings",
        slug: "seasons-greetings",
        subcategories: [
            { name: "Full Sets", slug: "full-sets" },
            { name: "Bonus Items", slug: "bonus-items" },
        ],
    },
    {
        name: "DVD & Blu-ray",
        slug: "dvd-bluray",
        subcategories: [
            { name: "Concert DVDs", slug: "concert-dvds" },
            { name: "Documentaries", slug: "documentaries" },
            { name: "Blu-ray Sets", slug: "bluray-sets" },
        ],
    },
    {
        name: "Fanclub Kits",
        slug: "fanclub-kits",
        subcategories: [
            { name: "Membership Kits", slug: "membership-kits" },
            { name: "Renewal Kits", slug: "renewal-kits" },
        ],
    },
    {
        name: "Toys & Figures",
        slug: "toys-figures",
        subcategories: [
            { name: "Plushies", slug: "plushies" },
            { name: "Action Figures", slug: "action-figures" },
            { name: "Desk Toys", slug: "desk-toys" },
        ],
    },
    {
        name: "Home & Decor",
        slug: "home-decor",
        subcategories: [
            { name: "Posters & Prints", slug: "posters-prints" },
            { name: "Room Decor", slug: "room-decor" },
            { name: "Blankets & Pillows", slug: "blankets-pillows" },
        ],
    },
    {
        name: "Trading & Random Packs",
        slug: "trading-random",
        subcategories: [
            { name: "Random Photocards", slug: "random-photocards" },
            { name: "Lucky Draws", slug: "lucky-draws" },
            { name: "Blind Packs", slug: "blind-packs" },
        ],
    },
    {
        name: "Japanese Releases",
        slug: "japanese-releases",
        subcategories: [
            { name: "Albums (JP)", slug: "albums-jp" },
            { name: "Singles (JP)", slug: "singles-jp" },
            { name: "Merch (JP)", slug: "merch-jp" },
        ],
    },
    {
        name: "Collab & Brand Goods",
        slug: "collab-brand-goods",
        subcategories: [
            { name: "Fashion Collabs", slug: "fashion-collabs" },
            { name: "Beauty Collabs", slug: "beauty-collabs" },
            { name: "Brand Promotions", slug: "brand-promotions" },
        ],
    },
    {
        name: "Pre-Order",
        slug: "pre-order",
        subcategories: [
            { name: "Upcoming Albums", slug: "upcoming-albums" },
            { name: "Upcoming Merch", slug: "upcoming-merch" },
            { name: "Exclusive Preorder Benefits", slug: "preorder-benefits" },
        ],
    },
];

const seed = async () => {
  const payload = await getPayload({ config })
    await payload.create({
        collection:"users",
        data:{
            email:"superadmin@gmail.com",
            password:"superadmin",
            roles:["super-admin"],
            username:"superadmin"
            
        }
    })
// for (const category of categories) {
//   const parentCategory = await payload.create({
//     collection: "categories",
//     data: {
//       name: category.name,
//       slug: category.slug,
//       parent: null,
//     },
//   })

//   for (const sub of category.subcategories ?? []) {
//     await payload.create({
//       collection: "categories",
//       data: {
//         name: sub.name,
//         slug: sub.slug,
//         parent: parentCategory.id,
//       },
//     })
//   }
// }

}
await seed()
process.exit(0)