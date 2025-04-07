import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {
  quotes: any[] = [];
  newQuote = {
    author: '',
    quote: '',
    date: '',
    title: ''
  };
  error: string = '';
  success: string = '';

  ngOnInit(): void {
    this.getQuotes();
  }

  async getQuotes() {
    try {
      const response = await axios.get('http://localhost:8080/api/quotes');
      this.quotes = response.data;
    } catch (error: any) {
      this.error = error.response?.data?.error || 'Failed to fetch quotes';
    }
  }

  async createQuote() {
    try {
      const { author, quote, date } = this.newQuote;
      if (!author || !quote || !date) {
        this.error = 'Author, quote, and date are required.';
        return;
      }

      const response = await axios.post('http://localhost:8080/api/quotes', this.newQuote);
      this.success = response.data.message;
      this.error = '';
      this.newQuote = { author: '', quote: '', date: '', title: '' };
      this.getQuotes();
    } catch (error: any) {
      this.error = error.response?.data?.error || 'Error creating quote';
      this.success = '';
    }
  }
}
