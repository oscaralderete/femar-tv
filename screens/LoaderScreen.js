import { ActivityIndicator } from "react-native";

import { dimensions, CenteredFullView } from "../theme/Components";

export default function LoaderScreen() {
  return (
    <CenteredFullView>
      <ActivityIndicator size='large' color={dimensions.themeColor} />
    </CenteredFullView>
  );
}
