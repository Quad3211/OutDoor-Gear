import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BlogService, BlogPost } from '../../services/blog.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class BlogPostComponent implements OnInit {
  post: BlogPost | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private title: Title,
    private meta: Meta,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        const id = parseInt(idParam, 10);
        this.loadPost(id);
      } else {
        this.router.navigate(['/blog']);
      }
    });
  }

  loadPost(id: number): void {
    this.isLoading = true;
    this.blogService.getPostById(id).subscribe((post) => {
      this.isLoading = false;
      if (post) {
        this.post = post;
        this.title.setTitle(`${post.title} — Island Adventure Blog`);
        this.meta.updateTag({ name: 'description', content: post.excerpt });
      } else {
        this.router.navigate(['/blog']);
      }
    });
  }
}
