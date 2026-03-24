import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: number;
  imageUrl: string;
  imageAlt: string;
  author: string;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private posts: BlogPost[] = [
    {
      id: 1,
      title: '5 Best Hiking Trails in the Blue Mountains',
      excerpt:
        "Discover the most stunning trails in Jamaica's highest peaks, from the Port Antonio stretch to the classic Blue Mountain Peak summit hike.",
      content:
        "<p>The Blue Mountains offer some of the most spectacular hiking experiences in the Caribbean. Ranging from dense tropical rainforests to high-altitude coffee plantations, these trails provide hikers with unforgettable views and intense physical challenges.</p><h3>1. The Blue Mountain Peak Trail</h3><p>The crown jewel of Jamaican hiking. Starting at Whitfield Hall or Abbey Green, this 7-mile ascent is best done starting at 2:00 AM to reach the summit by sunrise. On a clear day, you can see all the way to Cuba!</p><h3>2. Holywell Nature Walk</h3><p>Perfect for families and beginners. The Holywell Recreational Park offers several well-maintained loop trails ranging from 30 minutes to 2 hours. Expect cool mist, tree ferns, and endemic bird sightings.</p><h3>3. The Catherine's Peak Trail</h3><p>A short but extremely steep climb starting near Newcastle. It takes only an hour to summit, but the 360-degree views of Kingston and the northern coastline are entirely worth the effort.</p><h3>What to Pack</h3><p>The weather changes rapidly. Always carry a waterproof jacket, a headlamp, and at least 2 liters of water.</p>",
      category: 'Hiking',
      date: '2026-03-15',
      readTime: 8,
      imageUrl:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
      imageAlt: 'Blue Mountains Jamaica panoramic view at sunrise',
      author: 'Marcus Campbell',
    },
    {
      id: 2,
      title: 'Camping on a Budget: Top Tips for Jamaica 2026',
      excerpt:
        "You don't need to spend a fortune to enjoy the great outdoors. Here's how to camp comfortably in Jamaica for under $5,000 JMD per night.",
      content:
        "<p>If you're looking to explore Jamaica on a budget, camping is highly underutilized. With a few smart investments and local knowledge, you can sleep comfortably for a fraction of the cost of a hotel.</p><h3>Where to Camp Cheaply</h3><p>1. Holywell Park: For roughly $1,500 JMD per night, you can rent a campsite with access to bathrooms and BBQ pits.<br>2. Strawberry Fields Together: A slightly more premium but budget-friendly coastal camping experience.<br>3. Blue Mountain Hostels: Many offer backyard camping for a minor fee.</p><h3>Gear on a Budget</h3><p>Instead of buying everything brand new, consider renting larger items like 4-person tents. The Island Adventure Gear store offers rental packages during off-peak seasons.</p>",
      category: 'Camping',
      date: '2026-03-08',
      readTime: 6,
      imageUrl:
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80',
      imageAlt: 'Budget camping tent set up near a river in Jamaica',
      author: 'Kezia Brown',
    },
    {
      id: 3,
      title: 'Rock Climbing at Lovers Leap — A Beginner Guide',
      excerpt:
        "Lovers Leap in St. Elizabeth offers some of the best beginner-friendly climbing routes on the island. Here's everything you need to know.",
      content:
        '<p>The limestone cliffs of Lovers Leap provide an incredible climbing experience with views of the Caribbean Sea that simply cannot be matched.</p><p>For beginners, there are several bolted sport climbs ranging from 5.7 to 5.9. The rock is incredibly sharp in places, so heavy-duty belay gloves and highly durable chalk bags are recommended.</p><p>Always check in with the local climbing coalition before attempting these routes! Local guides are available for booking at the lighthouse.</p>',
      category: 'Climbing',
      date: '2026-02-20',
      readTime: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1200&q=80',
      imageAlt: 'Rock climber scaling a limestone cliff at sunset',
      author: 'Devon Taylor',
    },
    {
      id: 4,
      title: 'How to Choose the Right Backpack for Your Trip',
      excerpt:
        'Day pack, weekend pack, or expedition pack? Our comprehensive guide helps you pick the right volume, fit, and features for your adventure style.',
      content:
        '<p>Selecting a backpack is the most critical gear decision you will make. It dictates how much you can carry and how comfortable you will be carrying it.</p><h3>Sizing Your Pack</h3><ul><li><strong>10-25 Liters:</strong> Excellent for day trips, carrying extra water, a jacket, and snacks.</li><li><strong>30-50 Liters:</strong> Weekend trips. Perfect for overnight camping where you need a sleeping bag and small tent.</li><li><strong>50+ Liters:</strong> Multi-day expeditions.</li></ul><p>Always measure your torso length, not your height, when sizing a backpack!</p>',
      category: 'Gear Guide',
      date: '2026-02-10',
      readTime: 7,
      imageUrl:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80',
      imageAlt: 'Hiker with an orange backpack on a mountain trail',
      author: 'Marcus Campbell',
    },
    {
      id: 5,
      title: 'Leave No Trace: Responsible Outdoor Ethics in Jamaica',
      excerpt:
        "Jamaica's natural beauty is precious. Learn Leave No Trace principles and how the outdoor community is protecting our shared spaces.",
      content:
        '<p>As outdoor recreation grows in Jamaica, so does our impact on the environment. It is crucial to adopt Leave No Trace principles.</p><p><strong>1. Pack It In, Pack It Out:</strong> Never leave trash on the trail. If you brought it with you, take it back home.<br><strong>2. Stay on the Trail:</strong> Going off-trail damages fragile flora and increases erosion risks.<br><strong>3. Respect Wildlife:</strong> Observe animals from a distance. Never feed them.</p>',
      category: 'Environment',
      date: '2026-01-28',
      readTime: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      imageAlt: 'Clean mountain landscape with no litter — Jamaica wilderness',
      author: 'Kezia Brown',
    },
    {
      id: 6,
      title: "What's New: Spring 2026 Gear Arrivals",
      excerpt:
        "We've just stocked some amazing new products for the season including the Explorer 4-Person Tent and the Climbing Harness Pro. Read the full review.",
      content:
        "<p>Spring is here, and we've updated our inventory with cutting-edge gear to optimize your outdoor experiences.</p><h3>The Explorer 4-Person Tent</h3><p>Weighing only 8lbs, this is the most durable and lightweight family tent we've ever stocked. It survived a Category 1 hurricane simulation!</p><h3>Climbing Harness Pro</h3><p>With an updated belay loop structural design, it's safer and more comfortable during long hang times.</p>",
      category: 'News',
      date: '2026-01-15',
      readTime: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=1200&q=80',
      imageAlt: 'New gear items arranged on a wooden surface',
      author: 'Devon Taylor',
    },
  ];

  getPosts(): Observable<BlogPost[]> {
    return of(this.posts);
  }

  getPostById(id: number): Observable<BlogPost | undefined> {
    const post = this.posts.find((p) => p.id === id);
    return of(post);
  }
}
