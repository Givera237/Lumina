import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Creator {
  id: number;
  name: string;
  category: string;
  subscribers: string;
  description: string;
  imageUrl: string;
  verified: boolean;
}

@Component({
  selector: 'app-creator-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './creator-list.component.html',
  styleUrl: './creator-list.component.scss'
})
export class CreatorListComponent 
{
  currentFilter: string = 'All';

  categories: string[] = ['All', 'Lifestyle', 'Art', 'Music', 'Tech'];

  creators: Creator[] = [
    {
      id: 32,
      name: 'Elena Vance',
      category: 'Art Numérique',
      subscribers: '125k',
      description: 'Exploration des frontières entre réalité physique et abstractions génératives.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbK7tXEerXA-rPsM-tjdD_a2LuN9IRHB03ByWW8DkBsScDRARWnlN2BYGDkXE_-AziXXketvYwUjEcsbXTRIJKHAVmFesuDkoJHrD_asK9E2bo8xXalWKQyAJMUjTLZRbqc0d9vKHHsZTroFiefgx_mys0_Kfz73M4_U7VfJg32Nr-YsPps58mPf0a9vkGXhZcjWxJnrEqfugZg4H_gkcQBBsLq9FaA0zk6dq8KKvVAHQ7G7LNzpBnrrlKo_IvLwyVLLvKOoTCF4U',
      verified: true
    },
    {
      id: 33,
      name: 'Julian Thorne',
      category: 'Musique',
      subscribers: '89k',
      description: 'Compositeur de paysages sonores immersifs et néo-classiques.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6HuA0ePUbXgV2fSTCfE1kczN8a5WXOYwgF5TtdSg5z0Dg9I9Vm7thBSDi94UsiFgxKB5WyJOysTfPS6lYWJzppsNYubk7I3qEA5oWx6ei_Xiiwvq6llRIicfh3MJ7ekDkKG0GWnp4_TdeoDd5kke11-7mruZGrSpBo_zqkAaR_lDeJZB_TBKLfvpCddKxpSQEJNTeJdRHpC1Wv6xRR8qcLFjGLvefqzTAb0cpow_cvsKCXDnP_ltFre5M2x1AVgvKVewH0L-JBN0',
      verified: true
    },
    {
      id: 34,
      name: 'Amara Sol',
      category: 'Lifestyle',
      subscribers: '210k',
      description: "L'art de vivre en pleine conscience à travers le design et le voyage.",
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsAZZrS0FG5wq3_8UEs6UBOeUFG1QEYx8A-Ov0VTNHrwxpPePLRDe1XZevpuxIQaP-ZmIaerXvN5QmKzHBaUt-Q98ba26ILNY_KMzpq5GD5DfW8PxYpTjGpGKuJfkPeJogGTz3xeK8rwMg1O0YusNfFMHEJAuGPU0DDTO4THirpQyms97601rR4abuHHiXx4I28To222ILFVtjkU_f56RZ3eUem1G5kUehhJXjOqWsVGce02BxOwWBbMyioaMx-LHE4fBUAO35hWQ',
      verified: true
    },
    {
      id: 35,
      name: 'Leo Chen',
      category: 'Tech & Design',
      subscribers: '54k',
      description: "Redéfinir l'interaction humaine par le design spéculatif et l'IA.",
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHut7kdpYu_MMj4oDuEwDFCGQX6PcdpQm-DygHJOhmqvF8gclBmFch4QWLL2lBYVWH0LZVRhJq5pfOOLTEduF9yGhoGMXr1hIYuQoforFZvRB7qbGQuiJsfJ2vudZBdvVVFMi43RBi9fQuMc_h8vSB_fvbreBawhcBgxaPj-Gjgb6WDSewcVx8F-Ji9_xMXRXrGOL6gfbdqFDGsKQXgP83bel2Eha2BEPIazsYqJyBfN_s1ko1gDioE50ND3rEGswGFOdRjRopwnw',
      verified: true
    },
    {
      id: 36,
      name: 'Miso Kim',
      category: 'Art Visuel',
      subscribers: '76k',
      description: 'Stylisme expérimental et photographie de mode conceptuelle.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDB7Yb7teBoLDzLKYjUN2uYb8wVkI1ZVO5cH4GoaE7EPj5LsuGX8Sv2y8XTNJUbJ9zyLNVUkx7fkXp5cOOV_esDmZfqDyE0s-LT9ciFYPWptYe_528SYoT_5Y-Z4p00uwm-x7n9rHKut3ips0mQmlcrL6mQa9Te28ytYdvorCl6UbyS7QRzBjfdaFRpBetjCVbPmT3hIf5sQNmMruFqmno0C621C2bBSIiHpsR-11oV9NCGq7DDxLiFtJbaKlevSQQoPgCKv1IUhMA',
      verified: true
    },
    {
      id: 37,
      name: 'Elias Berg',
      category: 'Voyage',
      subscribers: '312k',
      description: 'Capturer le silence des sommets et l\'immensité de la nature sauvage.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuvp7FpqLHGsGfbyKJjb6CDiBrfiCzdTY9TljpSdwqUPV6aCD5LXQ664s-WG9jEQCTQjQr-RZRhhFjldkasfA5HxwAVlQuJaG4YxGv0BdrY-YvrAD19kXoFFGYDkFXJh02-cm1wwRnfHTol8qKp0SHyPZ9VJKVWe2V_MfjLzl7YBhK3bfULK_hfqz13QuOD8bnaFB0mov8dVDKsIrXcSyAQzHQ156gqPUBK93Vyt0hgdq0iqHY4OSHD6IJGZ8_2_6sECMgLcSgCNY',
      verified: true
    },
    {
      id: 38,
      name: 'Sienna Rossi',
      category: 'Design',
      subscribers: '45k',
      description: 'Créer des espaces qui racontent des histoires et apaisent l\'esprit.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwP7hP1KJN1Hh_lRNOBr5beZVb6KGQlzxEuWb8AGfZzXcMYle0ezho6DQ9aH04HGY_XkrjzMdg9JTm9UUNrbPKtWb3aHAJa2HvIQ0PvXbHA1ukU_X38CTv4uk-VWPLeVTVFZIiYPsHjlS12FqODQf0YiYuzwcZ_UowoGUgJMItn8BhvqTSutWTeUEKxSs4BvQSMFT1jx9mMA3oixCDX7jnMd8-9Qi9IL1Py0zhkSP-4FHJFve6K1bHRHtTS5TyAV_ZXNCHDbz7ePE',
      verified: true
    },
    {
      id: 39,
      name: 'Marcus Aris',
      category: 'Gastronomie',
      subscribers: '92k',
      description: "Fusionner la haute cuisine avec l'esthétique du design moderne.",
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5e1aRbpmgKoWcp3xrA_p_T-AQnpeV9IfGlF2EVPfqK-Hcj2ldcbBUTqTx_n_G0CkI0UX40tX8Pe4mG_kt7Xs7GXcLuX3OsK4CaBWXpPU8_AoYQN2xiCW6P1OWMZHPTW85RJmYKVr8JD0zMyK3C11b6OWYWBg8AL8KXkosGMiOBjaYhcRJ8gvChPlMUn7It1ECSfZ-2XBoKkmLfg7IpNhwe1v3OEpaVEElwSXqtMfZ7WRdgCjVvcm00ZQsg-DFAm5y4T98Mcb5jP8',
      verified: true
    },
    {
      id: 40,
      name: 'Lila Ray',
      category: 'Bien-être',
      subscribers: '156k',
      description: 'Rituels de bien-être pour une vie moderne équilibrée et luxueuse.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChZZ1N404p12Uuem6aYDLvlntR3_IA5UK2hA6WUb3WeNoEr7OCKnD5j33KVjqRPlhxat8KpctxFyxQrSepzxKMy3OQh7pj44NiVnl-FHLnCp6GgT1F1rZqt69N8gzYlwYv8p5T_hF3B3y9siEs-nO3mlq65Qs6Mhh92ip_vg3o00UmDmvkTcm9PF2rdORQLeY-IlY0zu-aZ2h1pa16nUOG39AgWhuh7udZiMay82gTgFNk-kQcclXGAEudNrhXBF6J_FhU8ZRbQ4k',
      verified: true
    },
    {
      id: 41,
      name: 'David Kael',
      category: 'Architecture',
      subscribers: '28k',
      description: 'Redéfinir le paysage urbain par des structures organiques et durables.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCodlAB9h8J_Cx0TP8Nw4Mpma02rUr6DzJTepxhLceTsImDWqpCIU1hj5pwb9jUp5-7diqTF3We7PgMr5iOn6ztVCGdiQpSYaMQBnNpwVwyw5d4k84J8ZLr4XEEft-zefn5s_LxnZItzK0BGxGDOBqA8Q-F6_Usk5tS3WLN3aH21G83tQH6TJtA9rph5wyKBhMyIW2zRJvFrANyEHWdRNGm34QJWs8QA1BH2W0BTc2rP2MRtF50XC0LymIpf9__9WIrD4dx-ri4faw',
      verified: true
    },
    {
      id: 42,
      name: 'Clara Dupont',
      category: 'Curatrice',
      subscribers: '67k',
      description: "Curation d'expériences esthétiques et de nouveaux talents émergents.",
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBaspa_6Tu122DvNnUNM_Gz8PD_IM8UBkaVj86cMbsQ03cGC2iPLARtxgLWcVJ_gpWQJxpotHGFZNWXV03i00eNzBl-vx14EuBzs3mru17ohzxFKX0L9ltoIYnkxUu2z08U_laM8ZXvz_ji1dwpmxAlqB5b3U33VSCcTiKO1tgxn7F9x2ZTYEdK-DbTUC-CeWs4qJdTXHExqNVqCKt1_dtmjincYNA559vOID_v1At2b9C9RLMJ5Rbb_qTC1TOaTxIBOk7-Q8_000',
      verified: true
    },
    {
      id: 43,
      name: 'Victor Hugo',
      category: 'Artisanat',
      subscribers: '34k',
      description: 'L\'art de la parfumerie de niche et des essences rares.',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIugn3CV92-77QgJEyxZVpevjdiCxlgh_K_XFmyDMRCardBtwA8sE3V-9wu_qkAKpgthgDF7HpfPTRbIvDIaTWX5L_bkpKOc-m21pHvvlFgesfLMBRPkEihg4A82CtHckG37FYzsuWS1gsrQnZtICM-ETYW6Q6gYLJ7_8PwGJlRUJGv7wD-5mA3Ye9s7187hOxFrISyrx6I0uAmjuCrJh_Eqtoxn6zaujFQHwpAPkj5NZj8OChwbDeX0ewK-vWJB4w6zDhWD8vP2o',
      verified: true
    }
  ];

  setFilter(category: string): void {
    this.currentFilter = category;
  }

  // Permet de filtrer dynamiquement les créateurs affichés à l'écran
  get filteredCreators(): Creator[] {
    if (this.currentFilter === 'All') {
      return this.creators;
    }
    return this.creators.filter(c => 
      c.category.toLowerCase().includes(this.currentFilter.toLowerCase())
    );
  }

  viewProfile(creator: Creator): void {
    console.log(`Navigation vers le profil de : ${creator.name}`);
  }
}
