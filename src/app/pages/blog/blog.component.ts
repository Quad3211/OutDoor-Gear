import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts: BlogPost[] = [];
  isLoading = true;

  constructor(
    private title: Title,
    private meta: Meta,
    private blogService: BlogService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Blog & News — Island Adventure Gear');
    this.meta.updateTag({
      name: 'description',
      content:
        'Outdoor tips, trail guides, gear reviews, and Jamaica adventure news from the Island Adventure Gear team.',
    });

    this.blogService.getPosts().subscribe((data) => {
      this.posts = data;
      this.isLoading = false;
    });
  }
}
