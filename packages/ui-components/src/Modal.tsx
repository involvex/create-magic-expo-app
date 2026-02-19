/**
 * Modal component with theme support and Uniwind styling.
 */

import {
  Modal as RNModal,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import type { ViewStyle } from "react-native";
import type { ReactNode } from "react";

export interface ModalProps {
  /**
   * Whether the modal is visible.
   */
  visible: boolean;
  /**
   * Callback when modal is dismissed.
   */
  onDismiss: () => void;
  /**
   * Modal content.
   */
  children: ReactNode;
  /**
   * Modal title.
   */
  title?: string;
  /**
   * Modal size.
   */
  size?: "sm" | "md" | "lg" | "full";
  /**
   * Additional modal content styles.
   */
  contentStyle?: ViewStyle;
  /**
   * Whether to show close button.
   */
  showCloseButton?: boolean;
  /**
   * Close button text.
   */
  closeButtonText?: string;
  /**
   * Background color of modal overlay.
   */
  overlayColor?: string;
  /**
   * Background color of modal content.
   */
  backgroundColor?: string;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const sizeStyles = {
  sm: { width: SCREEN_WIDTH * 0.85 },
  md: { width: SCREEN_WIDTH * 0.9 },
  lg: { width: SCREEN_WIDTH * 0.95 },
  full: { width: SCREEN_WIDTH * 0.98 },
};

/**
 * Themed modal component with Uniwind styling.
 *
 * @example
 * ```tsx
 * import { Modal, Text, Button } from '@magic-expo/ui-components';
 *
 * <Modal
 *   visible={isVisible}
 *   onDismiss={() => setIsVisible(false)}
 *   title="My Modal"
 *   size="md"
 * >
 *   <Text>Modal content goes here</Text>
 *   <Button title="Close" onPress={() => setIsVisible(false)} />
 * </Modal>
 * ```
 */
export function Modal(props: ModalProps) {
  const {
    visible,
    onDismiss,
    children,
    title,
    size = "md",
    contentStyle,
    showCloseButton = false,
    closeButtonText = "Close",
    overlayColor = "rgba(0, 0, 0, 0.5)",
    backgroundColor = "#FFFFFF",
  } = props;

  return (
    <RNModal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onDismiss}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={onDismiss}
      >
        <Pressable style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              sizeStyles[size],
              contentStyle,
              { backgroundColor },
            ]}
          >
            {title && <Text style={styles.title}>{title}</Text>}
            <View style={styles.childrenContainer}>{children}</View>
            {showCloseButton && (
              <Pressable
                onPress={onDismiss}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>{closeButtonText}</Text>
              </Pressable>
            )}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "100%",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    maxHeight: SCREEN_HEIGHT * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#000000",
  },
  childrenContainer: {
    flex: 1,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default Modal;
