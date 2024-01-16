

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
    const toggleBtn = document.getElementById('toggle');
    const collapseMenu = document.getElementById('collapseMenu');

    if (toggleBtn && collapseMenu) {
      toggleBtn.addEventListener('click', () => {
        if (collapseMenu.style.display === 'block') {
          collapseMenu.style.display = 'none';
        } else {
          collapseMenu.style.display = 'block';
        }
      });
    }
  }
}
