import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import FeatureFour from './FeatureFour'
import FeatureOne from './FeatureOne'
import FeatureThree from './FeatureThree'
import FeatureTwo from './FeatureTwo'

type Props = { 
  activeIndex: number 
}

type CardProps = {
  children: React.ReactNode
  title: string
  subTitle: string
}

const features = [
  {
    id: "feature1",
    title: "Workflow Automation",
    subTitle: "Build custom workflows to automate repetitive tasks",
    render: <FeatureOne/>
  },
  {
    id: "feature2",
    title: "Real-time Analytics",
    subTitle: "Monitor performance with live dashboards and insights",
    render: <FeatureTwo/>
  },
  {
    id: "feature3",
    title: "Team Collaboration",
    subTitle: "Stay aligned with shared workspaces and updates",
    render: <FeatureThree/>
  },
  {
    id: "feature4",
    title: "Integrations",
    subTitle: "Connect with tools like Slack, Google Workspace, and Zapier",
    render: <FeatureFour/>
  },
]

const Card = ({
  children,
  title,
  subTitle
}: CardProps) => (
  <div className="w-full h-full flex flex-col gap-[16px]">
    <div className="flex flex-col gap-1 mb-[8px]">
        <h3 className='text-3xl font-semibold'>{title}</h3>
        <p className="text-subtle">{subTitle}</p>
    </div>
    {children}
  </div>
)

const FeatureBox = ({ 
  activeIndex
}: Props) => {
  const activeTab = features[Math.min(activeIndex, features.length - 1)]?.id ?? "feature1"

  return (
    <div className='flex flex-col p-[24px] bg-white w-3/4 h-3/4 rounded-xl shadow-lg justify-between'>
      <Tabs value={activeTab} className="w-full flex flex-col gap-[16px]">
        <TabsList className="w-full gap-1">
          <TabsTrigger value="feature1" className="data-active:bg-blue-500 data-active:text-white">Automation</TabsTrigger>
          <TabsTrigger value="feature2" className="data-active:bg-blue-500 data-active:text-white">Analytics</TabsTrigger>
          <TabsTrigger value="feature3" className="data-active:bg-blue-500 data-active:text-white">Collaboration</TabsTrigger>
          <TabsTrigger value="feature4" className="data-active:bg-blue-500 data-active:text-white">Integration</TabsTrigger>
        </TabsList>
        {
          features.map((feature) => {
            const { id, title, subTitle, render } = feature

            return (
              <TabsContent value={id} key={id}>
                <Card title={title} subTitle={subTitle}>
                  {render}
                </Card>
              </TabsContent>
            )
          })
        }
      </Tabs>
    </div>
  )
}

export default FeatureBox