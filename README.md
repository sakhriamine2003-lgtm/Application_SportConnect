# Sport Connect

Sport Connect est une plateforme de mise en relation dans le domaine sportif. Elle permet aux sportifs de créer un portfolio, de consulter des offres de recrutement et d'y postuler. Les administrateurs peuvent gérer les clubs, les offres et les candidatures.

## Fonctionnalités

- Inscription et authentification avec rôles `sportif` et `admin`.
- Création et consultation d'un profil/portfolio sportif, avec photo.
- Consultation des offres de recrutement et dépôt de candidatures.
- Gestion des clubs, des offres et des candidatures côté administration.
- API protégée par Laravel Sanctum et contrôle d'accès selon le rôle.

## Architecture

| Dossier | Rôle |
| --- | --- |
| `Backend/` | API Laravel 12, base de données, authentification et règles métier. |
| `my-react-app/` | Interface React 19 servie par Vite. |

## Prérequis

- PHP 8.2 ou supérieur et Composer
- Node.js et npm
- Une base SQLite (configuration par défaut) ou un autre SGBD configuré dans `Backend/.env`

## Installation

Clonez le dépôt puis installez les dépendances des deux applications.

```powershell
cd Backend
copy .env.example .env
composer install
php artisan key:generate
```

Créez le fichier SQLite si vous utilisez la configuration par défaut, puis exécutez les migrations :

```powershell
New-Item -ItemType File -Path database/database.sqlite -Force
php artisan migrate
php artisan storage:link
```

Installez ensuite le client web :

```powershell
cd ..\my-react-app
npm install
```

## Lancer le projet

Dans un premier terminal, démarrez l'API :

```powershell
cd Backend
php artisan serve
```

Dans un second terminal, démarrez l'interface React :

```powershell
cd my-react-app
npm run dev
```

L'API est alors disponible par défaut sur `http://localhost:8000` et le client Vite affiche son URL locale dans le terminal. Le client est configuré pour appeler `http://localhost:8000/api` dans `my-react-app/src/axios/axios.js`.

## Principaux endpoints API

Les routes protégées requièrent une authentification Sanctum. Les permissions dépendent du rôle de l'utilisateur.

| Méthode | Endpoint | Accès | Description |
| --- | --- | --- | --- |
| `POST` | `/api/register` | Public | Créer un compte. |
| `POST` | `/api/login` | Public | Se connecter. |
| `POST` | `/api/logout` | Authentifié | Se déconnecter. |
| `GET` | `/api/profil` | Sportif | Consulter son profil. |
| `GET` | `/api/AfficherPortfolio` | Sportif | Consulter son portfolio. |
| `POST` | `/api/portfolio` | Sportif | Créer ou mettre à jour son portfolio. |
| `GET` | `/api/offres` | Authentifié | Consulter les offres. |
| `POST` | `/api/offres` | Admin | Créer une offre. |
| `PUT`, `DELETE` | `/api/offres/{offre}` | Admin | Modifier ou supprimer une offre. |
| `POST` | `/api/offres/{offre}/candidatures` | Sportif | Postuler à une offre. |
| `GET` | `/api/candidatures` | Admin | Consulter les candidatures. |
| `PATCH` | `/api/candidatures/{candidature}` | Admin | Traiter une candidature. |
| `GET`, `POST` | `/api/clubs` | Admin | Consulter et créer des clubs. |

Consultez [`Backend/routes/api.php`](Backend/routes/api.php) pour la liste complète et les chemins exacts des routes paramétrées.

## Tests

Pour exécuter les tests du backend :

```powershell
cd Backend
php artisan test --compact
```

Pour vérifier le client :

```powershell
cd my-react-app
npm run lint
npm run build
```

## Modélisation

Les diagrammes de cas d'utilisation et de classes sont disponibles dans [`Backend/Diagrame/`](Backend/Diagrame/).
