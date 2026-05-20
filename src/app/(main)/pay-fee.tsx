import { Screen } from '@/components/layout/Screen';
import { PlaceholderPanel } from '@/components/layout/PlaceholderPanel';
import { ScreenHeader } from '@/components/layout/ScreenHeader';

export default function PayFeeScreen() {
  return (
    <Screen scrollable>
      <ScreenHeader title="Pay Fee" subtitle="Payments and receipts" />
      <PlaceholderPanel
        title="Payments coming soon"
        description="Course fee payment, receipts, and enrollment billing for repair training programs will be handled in this section."
      />
    </Screen>
  );
}
