# My AstroMood - Landing Page & Admin Web Panel

Plateforme web complète pour My AstroMood, comprenant une landing page interactive et un panneau d'administration pour gérer le contenu de l'application mobile. Interface moderne avec support multilingue et thème sombre/clair.

## ✨ Fonctionnalités Principales

### 🌐 Landing Page Interactive

- **Design moderne** : Interface Minimaliste avec animations et effets de parallaxe
- **Multilingue** : Support complet Français/Anglais
- **Thème adaptatif** : Mode sombre et clair
- **Responsive** : Optimisé pour tous les écrans (mobile, tablette, desktop)

### 🔧 Panneau d'Administration

- **Authentification sécurisée** : Accès restreint aux administrateurs via Supabase Auth
- **Gestion des utilisateurs** : Visualisation et modification des rôles utilisateurs
- **Gestion du contenu** :
  - Modification des affirmations quotidiennes en temps réel
  - Gestion multilingue (EN/FR) des contenus
  - Surveillance de l'API horoscope
  - Configuration des phases lunaires

## 🏗️ Architecture Technique

### Frontend

- **Framework** : Next.js 14 avec App Router et Server Components
- **TypeScript** : Code entièrement typé pour une meilleure maintenabilité
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion pour les transitions et Lottie pour les animations

### Backend

- **API Routes** : Next.js API routes pour la communication avec Supabase
- **Authentication** : Supabase Auth avec vérification de rôles administrateurs
- **Base de données** : PostgreSQL via Supabase
- **Storage** : Supabase Storage pour les assets et images
- **Protection des routes** : Middleware de vérification admin
- **Variables d'environnement** : Configuration sécurisée des clés API

## 🚀 Installation & Démarrage

### 1. Cloner le repository

```bash
git clone ...
cd landing-page
```

### 2. Installation des dépendances

```bash
npm install
# ou
yarn install
```

### 3. Configuration des variables d'environnement

Créer le fichier `.env.local` :

```env
# Supabase Configuration (mêmes que l'app mobile)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

```

### 4. Configuration de la base de données

Créer la table des affirmations dans Supabase :

```sql
-- Table pour les affirmations
CREATE TABLE affirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(20) NOT NULL,
  text TEXT NOT NULL,
  language VARCHAR(2) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contrainte unique pour éviter les doublons
ALTER TABLE affirmations
ADD CONSTRAINT unique_type_language UNIQUE (type, language);

-- Données par défaut
INSERT INTO affirmations (type, text, language) VALUES
('today', 'Today''s cosmic energy brings new opportunities for growth and self-discovery.', 'en'),
('tomorrow', 'Tomorrow holds the promise of new beginnings and fresh perspectives.', 'en'),
('week', 'This week, embrace the changes coming your way with confidence and grace.', 'en'),
('month', 'The month ahead holds promise for deep personal transformation and renewal.', 'en');
```

### 5. Démarrage en développement

```bash
npm run dev
# ou
yarn dev
```

## 🔗 Lien Utile

- **Repository Principal** : [AstroMood App](https://github.com/sitandoucara/astro_app)

## 🎯 Fin

Merci d'avoir consulté mon projet React Native.

[Sitan]
