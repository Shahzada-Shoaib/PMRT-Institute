import { Screen } from '@/components/layout/Screen';
import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

export default function AboutUsScreen() {
  return (
    <Screen scrollable>
      <ScreenHeader title="About Us" subtitle="Mission and team" />
      <PlaceholderPanel
        title="About PMRT Institute"
        description="PMRT Institute helps technicians learn smartphone repair through structured courses, repair videos, diagrams, and workshop-ready study material."
      />
    </Screen>
  );
}
