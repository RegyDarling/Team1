import { useState } from 'react'
import './App.css'
import ProfileCard from './components/ProfileCard'

const people = [
  {
    id: 1,
    name: 'Regina',
    role: 'UI Engineer',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    bio: 'Regina enjoys turning complex flows into calm, intuitive interfaces.',
    githubUrl: 'https://github.com/avachen',
  },
  {
    id: 2,
    name: 'Richmond',
    role: 'Frontend Developer',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    bio: 'Richmond loves animation details and keeps every interaction feeling responsive.',
    githubUrl: 'https://github.com/noahpatel',
  },
  {
    id: 3,
    name: 'Margaret',
    role: 'Product Designer',
    photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    bio: 'Margaret focuses on making the product feel polished and approachable.',
    githubUrl: 'https://github.com/minaalvarez',
  },
  {
    id: 4,
    name: 'Faisal',
    role: 'React Specialist',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    bio: 'Faisal enjoys building reusable components that scale without getting messy.',
    githubUrl: 'https://github.com/liambrooks',
  },
  {
    id: 5,
    name: 'Rohi',
    role: 'Accessibility Lead',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    bio: 'Rohi champions accessible experiences that work for everyone.',
    githubUrl: 'https://github.com/sofiakim',
  },
  {
    id: 6,
    name: 'Marlon',
    role: 'Full Stack Builder',
    photoUrl: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80',
    bio: 'Marlon bridges design and data with thoughtful product engineering.',
    githubUrl: 'https://github.com/ethanrivera',
  },
]

function App() {
  const [expandedIds, setExpandedIds] = useState([])

  const toggleCard = (id) => {
    setExpandedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <div>
          <p className="eyebrow">Team Spotlight</p>
          <h1>Meet the people behind the product</h1>
        </div>
        <div className="counter-pill">Expanded: {expandedIds.length}</div>
      </header>

      <section className="card-grid">
        {people.map((person) => (
          <ProfileCard
            key={person.id}
            name={person.name}
            role={person.role}
            photoUrl={person.photoUrl}
            bio={person.bio}
            githubUrl={person.githubUrl}
            isExpanded={expandedIds.includes(person.id)}
            onToggle={() => toggleCard(person.id)}
          />
        ))}
      </section>
    </main>
  )
}

export default App
