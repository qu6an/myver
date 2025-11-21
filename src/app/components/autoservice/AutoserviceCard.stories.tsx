import type { Meta, StoryObj } from "@storybook/react"
import { HelpCircle, Users, Crown } from "lucide-react"
import { AutoserviceCard } from "./AutoserviceCard"
import type { AutoserviceProject } from "./types"

const meta: Meta<typeof AutoserviceCard> = {
  title: "Components/AutoserviceCard",
  component: AutoserviceCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "featured", "glass"],
    },
    showTwinkle: {
      control: "boolean",
    },
  },
}

export default meta
type Story = StoryObj<typeof AutoserviceCard>

const sampleProject: AutoserviceProject = {
  id: "quiz",
  icon: HelpCircle,
  title: "Автомобильная викторина",
  description: "Зарабатывайте очки за правильные ответы. Победители получают реальные призы и баллы.",
  linkText: "Правила PDF",
  badge: { text: "Активно", variant: "active" },
  link: "#",
}

export const Default: Story = {
  args: {
    project: sampleProject,
    variant: "default",
  },
}

export const Featured: Story = {
  args: {
    project: {
      id: "everycar",
      icon: Users,
      title: "EVERYCAR",
      description:
        "Постоянная программа мотивации — уровни, задания, бонусы. Станьте частью крупнейшего сообщества СТО.",
      linkText: "Присоединиться",
      badge: { text: "Идёт набор", variant: "open" },
      featured: true,
    },
    variant: "featured",
  },
}

export const WithTwinkle: Story = {
  args: {
    project: {
      id: "contest",
      icon: Crown,
      title: "Автосервис года",
      description: "Конкурс с учётом показателей и репутации. Номинации и призы для лучших автосервисов страны.",
      linkText: "Правила PDF",
      badge: { text: "Скоро", variant: "soon" },
      link: "#",
    },
    showTwinkle: true,
  },
}

export const Glass: Story = {
  args: {
    project: sampleProject,
    variant: "glass",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 max-w-6xl">
      <AutoserviceCard project={sampleProject} variant="default" onAction={(id) => console.log("Action:", id)} />
      <AutoserviceCard
        project={{
          id: "everycar",
          icon: Users,
          title: "EVERYCAR",
          description: "Постоянная программа мотивации — уровни, задания, бонусы.",
          linkText: "Присоединиться",
          badge: { text: "Идёт набор", variant: "open" },
        }}
        variant="featured"
        index={1}
      />
      <AutoserviceCard
        project={{
          id: "contest",
          icon: Crown,
          title: "Автосервис года",
          description: "Конкурс с учётом показателей и репутации.",
          linkText: "Правила PDF",
          badge: { text: "Скоро", variant: "soon" },
          link: "#",
        }}
        variant="glass"
        index={2}
        showTwinkle
      />
    </div>
  ),
}
