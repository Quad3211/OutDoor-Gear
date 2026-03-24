import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  imageUrl: string;
  imageAlt: string;
  author: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [
    {
      id: 1,
      title: '5 Best Hiking Trails in the Blue Mountains',
      excerpt:
        "Discover the most stunning trails in Jamaica's highest peaks, from the Port Antonio stretch to the classic Blue Mountain Peak summit hike.",
      category: 'Hiking',
      date: '2026-03-15',
      readTime: 8,
      imageUrl:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=70',
      imageAlt: 'Blue Mountains Jamaica panoramic view at sunrise',
      author: 'Marcus Campbell',
    },
    {
      id: 2,
      title: 'Camping on a Budget: Top Tips for Jamaica 2026',
      excerpt:
        "You don't need to spend a fortune to enjoy the great outdoors. Here's how to camp comfortably in Jamaica for under $5,000 JMD per night.",
      category: 'Camping',
      date: '2026-03-08',
      readTime: 6,
      imageUrl:
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=70',
      imageAlt: 'Budget camping tent set up near a river in Jamaica',
      author: 'Kezia Brown',
    },
    {
      id: 3,
      title: 'Rock Climbing at Lovers Leap — A Beginner Guide',
      excerpt:
        "Lovers Leap in St. Elizabeth offers some of the best beginner-friendly climbing routes on the island. Here's everything you need to know.",
      category: 'Climbing',
      date: '2026-02-20',
      readTime: 10,
      imageUrl:
        'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=70',
      imageAlt: 'Rock climber scaling a limestone cliff at sunset',
      author: 'Devon Taylor',
    },
    {
      id: 4,
      title: 'How to Choose the Right Backpack for Your Trip',
      excerpt:
        'Day pack, weekend pack, or expedition pack? Our comprehensive guide helps you pick the right volume, fit, and features for your adventure style.',
      category: 'Gear Guide',
      date: '2026-02-10',
      readTime: 7,
      imageUrl:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=70',
      imageAlt: 'Hiker with an orange backpack on a mountain trail',
      author: 'Marcus Campbell',
    },
    {
      id: 5,
      title: 'Leave No Trace: Responsible Outdoor Ethics in Jamaica',
      excerpt:
        "Jamaica's natural beauty is precious. Learn Leave No Trace principles and how the outdoor community is protecting our shared spaces.",
      category: 'Environment',
      date: '2026-01-28',
      readTime: 5,
      imageUrl:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70',
      imageAlt: 'Clean mountain landscape with no litter — Jamaica wilderness',
      author: 'Kezia Brown',
    },
    {
      id: 6,
      title: "What's New: Spring 2026 Gear Arrivals",
      excerpt:
        "We've just stocked some amazing new products for the season including the Explorer 4-Person Tent and the Climbing Harness Pro. Read the full review.",
      category: 'News',
      date: '2026-01-15',
      readTime: 4,
      imageUrl:
        'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?w=600&q=70',
      imageAlt: 'New gear items arranged on a wooden surface',
      author: 'Devon Taylor',
    },
  ];

  constructor(
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Blog & News — Island Adventure Gear');
    this.meta.updateTag({
      name: 'description',
      content:
        'Outdoor tips, trail guides, gear reviews, and Jamaica adventure news from the Island Adventure Gear team.',
    });
  }
}
