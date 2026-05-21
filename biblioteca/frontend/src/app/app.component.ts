import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <!-- Sidebars decorativas -->
    <aside class="sidebar sidebar-left" aria-hidden="true">
      <div class="sidebar-spine"></div>
      <div class="sidebar-books">
        <div class="book b1"><span>Don Quijote</span></div>
        <div class="book b2"><span>Cien Años</span></div>
        <div class="book b3"><span>Rayuela</span></div>
        <div class="book b4"><span>Ulises</span></div>
        <div class="book b5"><span>Ficciones</span></div>
        <div class="book b6"><span>La Odisea</span></div>
        <div class="book b7"><span>Moby Dick</span></div>
        <div class="book b8"><span>El Aleph</span></div>
      </div>
      <div class="sidebar-ornament">❧</div>
      <div class="sidebar-quote">
        <p>"Un libro es un sueño que tienes en tus manos."</p>
        <span>— Neil Gaiman</span>
      </div>
      <div class="sidebar-rule"></div>
      <div class="sidebar-stats">
        <div class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="2" y="2" width="20" height="20" rx="2" fill="#7A4A2A"/>
            <rect x="2" y="2" width="20" height="4" rx="2" fill="#C8922A"/>
            <rect x="2" y="18" width="20" height="4" rx="2" fill="#C8922A"/>
            <rect x="2" y="10" width="20" height="3" rx="1" fill="#C8922A"/>
            <rect x="4" y="6" width="4" height="4" rx="1" fill="#E8B84B"/>
            <rect x="10" y="6" width="3" height="4" rx="1" fill="#8B3A3A"/>
            <rect x="15" y="6" width="5" height="4" rx="1" fill="#E8B84B"/>
            <rect x="4" y="13" width="3" height="5" rx="1" fill="#C8922A"/>
            <rect x="9" y="13" width="4" height="5" rx="1" fill="#8B3A3A"/>
            <rect x="15" y="13" width="5" height="5" rx="1" fill="#E8B84B"/>
          </svg>
          <span class="stat-label">Clásicos</span>
        </div>
        <div class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M6 20 Q5 23 8 22 Q12 19 18 8 Q20 4 21 4 Q18 3 16 6 Q10 14 6 20Z" fill="#C8922A"/>
            <path d="M6 20 Q5 23 8 22 Q8 20 7 18Z" fill="#7A4A2A"/>
            <path d="M16 6 Q18 3 21 4 Q20 6 18 8 Q17 7 16 6Z" fill="#E8B84B"/>
          </svg>
          <span class="stat-label">Autores</span>
        </div>
        <div class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect x="3" y="13" width="4" height="9" rx="1" fill="#C8922A"/>
            <rect x="10" y="9" width="4" height="13" rx="1" fill="#E8B84B"/>
            <rect x="17" y="11" width="4" height="11" rx="1" fill="#8B3A3A"/>
            <path d="M2 22 L22 22" stroke="#C8922A" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M1 8 L12 2 L23 8" fill="#7A4A2A"/>
          </svg>
          <span class="stat-label">Colección</span>
        </div>
      </div>
    </aside>

    <aside class="sidebar sidebar-right" aria-hidden="true">
      <div class="sidebar-spine"></div>
      <div class="sidebar-books">
        <div class="book b9"><span>Anna Karénina</span></div>
        <div class="book b10"><span>Crimen y Castigo</span></div>
        <div class="book b11"><span>El Proceso</span></div>
        <div class="book b12"><span>Lolita</span></div>
        <div class="book b13"><span>Madame Bovary</span></div>
        <div class="book b14"><span>La Ilíada</span></div>
        <div class="book b15"><span>Hamlet</span></div>
        <div class="book b16"><span>Fausto</span></div>
      </div>
      <div class="sidebar-ornament">❧</div>
      <div class="sidebar-quote">
        <p>"La lectura es a la mente lo que el ejercicio es al cuerpo."</p>
        <span>— Joseph Addison</span>
      </div>
      <div class="sidebar-rule"></div>
      <div class="sidebar-calendar">
        <div class="cal-label">Horario</div>
        <div class="cal-row"><span>Lun – Vie</span><span>9h – 20h</span></div>
        <div class="cal-row"><span>Sábado</span><span>10h – 14h</span></div>
        <div class="cal-row closed"><span>Domingo</span><span>Cerrado</span></div>
      </div>
    </aside>

    <!-- Layout principal -->
    <div class="app-wrapper">
      <header class="navbar">
        <div class="navbar-brand">
          <svg class="brand-icon" viewBox="0 0 120 140" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <!-- Libro base -->
            <rect x="15" y="20" width="90" height="110" rx="5" fill="#5C3218"/>
            <!-- Páginas laterales -->
            <rect x="10" y="25" width="8" height="100" rx="2" fill="#F5EDE0" stroke="#D6C9B8" stroke-width="0.8"/>
            <!-- Portada -->
            <rect x="20" y="25" width="80" height="100" rx="3" fill="#7A4A2A"/>
            <rect x="26" y="31" width="68" height="88" rx="2" fill="none" stroke="#B8860B" stroke-width="1.2"/>
            <rect x="30" y="35" width="60" height="80" rx="1" fill="none" stroke="#B8860B" stroke-width="0.5" opacity="0.5"/>
            <!-- Líneas título -->
            <line x1="35" y1="52" x2="85" y2="52" stroke="#F5E8C0" stroke-width="1.5" opacity="0.85"/>
            <line x1="40" y1="61" x2="80" y2="61" stroke="#F5E8C0" stroke-width="1" opacity="0.5"/>
            <line x1="40" y1="69" x2="80" y2="69" stroke="#F5E8C0" stroke-width="1" opacity="0.5"/>
            <!-- Ornamento circular -->
            <circle cx="60" cy="97" r="14" fill="none" stroke="#B8860B" stroke-width="1.2"/>
            <text x="60" y="103" text-anchor="middle" font-family="Georgia,serif" font-size="17" fill="#B8860B" font-style="italic">B</text>
            <!-- Pluma -->
            <path d="M90 24 Q113 1 123 0 Q118 10 103 18 Q113 8 110 20 Q100 16 90 24Z" fill="#B8860B"/>
            <path d="M90 24 L86 36" stroke="#7A6452" stroke-width="1.2" fill="none" stroke-linecap="round"/>
          </svg>
          <div class="brand-text">
            <span class="brand-name">Biblioteca</span>
            <span class="brand-sub">Gestión de Fondos</span>
          </div>
        </div>
        <nav class="navbar-nav">
          <a routerLink="/autores" routerLinkActive="active" class="nav-link">
            <svg class="nav-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10 34 Q8 38 12 37 Q18 32 28 14 Q32 7 34 6 Q30 5 26 9 Q16 22 10 34Z" fill="#C8922A"/>
              <path d="M10 34 Q8 38 12 37 Q13 34 12 31Z" fill="#7A4A2A"/>
              <path d="M26 9 Q30 5 34 6 Q32 9 29 12 Q27 10 26 9Z" fill="#E8B84B"/>
            </svg>
            Autores
          </a>
          <a routerLink="/libros" routerLinkActive="active" class="nav-link">
            <svg class="nav-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="4" y="4" width="32" height="32" rx="3" fill="#7A4A2A"/>
              <rect x="4" y="4" width="32" height="6" rx="3" fill="#C8922A"/>
              <rect x="4" y="30" width="32" height="6" rx="3" fill="#C8922A"/>
              <rect x="4" y="17" width="32" height="5" rx="1" fill="#C8922A"/>
              <rect x="7"  y="10" width="6" height="7" rx="1" fill="#E8B84B"/>
              <rect x="15" y="10" width="5" height="7" rx="1" fill="#8B3A3A"/>
              <rect x="22" y="10" width="6" height="7" rx="1" fill="#E8B84B"/>
              <rect x="30" y="10" width="4" height="7" rx="1" fill="#C8922A"/>
              <rect x="7"  y="22" width="5" height="8" rx="1" fill="#C8922A"/>
              <rect x="14" y="22" width="6" height="8" rx="1" fill="#8B3A3A"/>
              <rect x="22" y="22" width="4" height="8" rx="1" fill="#E8B84B"/>
              <rect x="28" y="22" width="6" height="8" rx="1" fill="#C8922A"/>
            </svg>
            Libros
          </a>
        </nav>
      </header>

      <main class="main-content">
        <router-outlet />
      </main>

      <footer class="footer">
        <div class="footer-ornament">— ✦ —</div>
        <p class="footer-text">BibliotecaApp · Dev Paladins · <span class="footer-year">{{ year }}</span></p>
        <p class="footer-motto">«El saber no ocupa lugar»</p>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: row;
        min-height: 100vh;
        position: relative;
      }

      /* ── Sidebars ── */
      .sidebar {
        width: 160px;
        flex-shrink: 0;
        background: #2A1A0E;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem 0.75rem;
        gap: 1.25rem;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow: hidden;
        border-right: 3px solid #B8860B;
      }

      .sidebar-right {
        border-right: none;
        border-left: 3px solid #B8860B;
      }

      .sidebar-spine {
        width: 2px;
        height: 60px;
        background: linear-gradient(to bottom, transparent, #B8860B, transparent);
        margin-bottom: 0.25rem;
      }

      /* Estantería de libros */
      .sidebar-books {
        display: flex;
        flex-direction: column;
        gap: 3px;
        width: 100%;
      }

      .book {
        height: 28px;
        border-radius: 2px 4px 4px 2px;
        display: flex;
        align-items: center;
        padding: 0 8px;
        position: relative;
        overflow: hidden;
        cursor: default;
        transition: transform 0.2s, filter 0.2s;
        border-left: 3px solid rgba(255,255,255,0.15);
      }

      .book:hover {
        transform: translateX(3px);
        filter: brightness(1.15);
      }

      .book span {
        font-family: var(--font-body);
        font-size: 0.58rem;
        color: rgba(255,255,255,0.75);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        letter-spacing: 0.03em;
      }

      /* Paleta de colores para los lomos */
      .b1  { background: #8B3A3A; }
      .b2  { background: #4A6741; }
      .b3  { background: #3A5A8B; }
      .b4  { background: #7A5C2A; }
      .b5  { background: #5A3A7A; }
      .b6  { background: #2A6B6B; }
      .b7  { background: #8B6B3A; }
      .b8  { background: #6B3A5A; }
      .b9  { background: #3A6B3A; }
      .b10 { background: #8B4A2A; }
      .b11 { background: #2A4A7A; }
      .b12 { background: #7A2A5A; }
      .b13 { background: #4A7A4A; }
      .b14 { background: #6B5A2A; }
      .b15 { background: #2A6B4A; }
      .b16 { background: #7A3A2A; }

      .sidebar-ornament {
        font-size: 1.4rem;
        color: #B8860B;
        line-height: 1;
      }

      .sidebar-quote {
        text-align: center;
        padding: 0.5rem;
      }

      .sidebar-quote p {
        font-family: var(--font-body);
        font-style: italic;
        font-size: 0.65rem;
        color: rgba(245, 230, 195, 0.75);
        line-height: 1.5;
        margin: 0 0 0.3rem;
      }

      .sidebar-quote span {
        font-family: var(--font-body);
        font-size: 0.58rem;
        color: #B8860B;
        letter-spacing: 0.04em;
      }

      .sidebar-rule {
        width: 70%;
        height: 1px;
        background: linear-gradient(to right, transparent, #B8860B55, transparent);
      }

      .sidebar-stats {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        width: 100%;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.6rem;
        background: rgba(184,134,11,0.1);
        border-radius: 5px;
        border: 1px solid rgba(184,134,11,0.2);
      }

      .stat-icon { width: 18px; height: 18px; flex-shrink: 0; }

      .stat-label {
        font-family: var(--font-body);
        font-size: 0.65rem;
        color: rgba(245, 230, 195, 0.7);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .sidebar-calendar {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }

      .cal-label {
        font-family: var(--font-display);
        font-size: 0.65rem;
        font-weight: 600;
        color: #B8860B;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        text-align: center;
        margin-bottom: 0.25rem;
      }

      .cal-row {
        display: flex;
        justify-content: space-between;
        font-family: var(--font-body);
        font-size: 0.6rem;
        color: rgba(245, 230, 195, 0.65);
        padding: 0.2rem 0;
        border-bottom: 1px solid rgba(184,134,11,0.15);
      }

      .cal-row.closed {
        color: rgba(245, 230, 195, 0.35);
        font-style: italic;
      }

      /* ── App wrapper (columna central) ── */
      .app-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        min-width: 0;
      }

      /* ── Navbar ── */
      .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        height: 68px;
        background: #2A1A0E;
        color: #F5E8C0;
        box-shadow: 0 3px 12px rgba(0,0,0,0.25);
        border-bottom: 2px solid #B8860B;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .navbar-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }

      .brand-icon { width: 36px; height: 42px; flex-shrink: 0; }

      .brand-text {
        display: flex;
        flex-direction: column;
      }

      .brand-name {
        font-family: var(--font-display);
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: 0.02em;
        color: #F5E8C0;
        line-height: 1.1;
      }

      .brand-sub {
        font-family: var(--font-body);
        font-size: 0.65rem;
        color: #B8860B;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .navbar-nav {
        display: flex;
        gap: 0.25rem;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        padding: 0.5rem 1.1rem;
        color: rgba(245, 232, 192, 0.75);
        text-decoration: none;
        border-radius: 6px;
        font-family: var(--font-body);
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.03em;
        transition: all 0.2s;
        border: 1px solid transparent;
      }

      .nav-icon { width: 22px; height: 22px; flex-shrink: 0; }

      .nav-link:hover,
      .nav-link.active {
        background: rgba(184,134,11,0.18);
        color: #F5E8C0;
        border-color: rgba(184,134,11,0.35);
      }

      .nav-link.active {
        color: #F5E8C0;
      }

      /* ── Main content ── */
      .main-content {
        flex: 1;
        padding: 2.25rem 2rem;
        max-width: 1000px;
        width: 100%;
        margin: 0 auto;
      }

      /* ── Footer ── */
      .footer {
        text-align: center;
        padding: 1.25rem 1rem;
        color: var(--color-muted);
        border-top: 1px solid var(--color-border);
        background: var(--color-bg-alt);
      }

      .footer-ornament {
        font-size: 0.85rem;
        color: var(--color-gold, #B8860B);
        letter-spacing: 0.4em;
        margin-bottom: 0.4rem;
      }

      .footer-text {
        margin: 0;
        font-family: var(--font-body);
        font-size: 0.82rem;
        color: var(--color-muted);
      }

      .footer-year { color: var(--color-primary); }

      .footer-motto {
        margin: 0.25rem 0 0;
        font-family: var(--font-display);
        font-style: italic;
        font-size: 0.8rem;
        color: var(--color-muted);
        opacity: 0.7;
      }

      /* ── Responsive: ocultar sidebars en pantallas pequeñas ── */
      @media (max-width: 1100px) {
        .sidebar { width: 120px; }
        .sidebar-quote, .sidebar-stats, .sidebar-calendar { display: none; }
      }

      @media (max-width: 820px) {
        .sidebar { display: none; }
      }
    `,
  ],
})
export class AppComponent {
  year = new Date().getFullYear();
}
