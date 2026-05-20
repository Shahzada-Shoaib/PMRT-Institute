import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { carouselSlides } from '@/data/mock/media';
import { useResponsiveLayout } from '@/hooks/useResponsiveLayout';
import { colors, radius, spacing } from '@/constants/theme';

export function LoginCarousel() {
  const { width, login, type, lineHeight, fontScale } = useResponsiveLayout();
  const listRef = useRef<FlatList<(typeof carouselSlides)[number]>>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slideWidth = width;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
          position: 'relative',
        },
        list: {
          flex: 1,
        },
        slide: {
          width: slideWidth,
          height: '100%',
        },
        imageShell: {
          flex: 1,
          overflow: 'hidden',
          backgroundColor: colors.surface,
        },
        image: {
          width: '100%',
          height: '100%',
        },
        overlay: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: login.isShortHeight ? spacing.md : spacing.lg,
          paddingTop: login.isShortHeight ? spacing.sm : spacing.md,
          paddingBottom: login.isShortHeight ? 40 : 48,
          gap: spacing.sm,
        },
        title: {
          color: colors.textOnPrimary,
          fontSize: login.isShortHeight ? type.title : type.hero,
          fontWeight: '800',
          lineHeight: login.isShortHeight ? lineHeight.title : lineHeight.hero,
          letterSpacing: -0.4,
        },
        subtitle: {
          color: 'rgba(255,255,255,0.9)',
          fontSize: login.isShortHeight ? type.body : type.section,
          lineHeight: login.isShortHeight ? lineHeight.body : lineHeight.section,
        },
        dots: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: login.isShortHeight ? spacing.sm : spacing.md,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: spacing.sm,
          zIndex: 2,
        },
        dot: {
          width: 8,
          height: 8,
          borderRadius: radius.pill,
          backgroundColor: 'rgba(255, 255, 255, 0.45)',
        },
        dotActive: {
          width: 22,
          backgroundColor: colors.textOnPrimary,
        },
      }),
    [lineHeight, login.isShortHeight, slideWidth, type],
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % carouselSlides.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / slideWidth);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={styles.list}
        data={carouselSlides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onScrollToIndexFailed={() => {
          listRef.current?.scrollToOffset({ offset: activeIndex * slideWidth, animated: true });
        }}
        getItemLayout={(_, index) => ({
          length: slideWidth,
          offset: slideWidth * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <View style={styles.imageShell}>
              <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
              <LinearGradient
                colors={['transparent', 'rgba(15,23,42,0.82)']}
                style={styles.overlay}>
                <Text maxFontSizeMultiplier={fontScale} style={styles.title}>
                  {item.title}
                </Text>
                <Text maxFontSizeMultiplier={fontScale} style={styles.subtitle}>
                  {item.subtitle}
                </Text>
              </LinearGradient>
            </View>
          </View>
        )}
      />
      <View style={styles.dots}>
        {carouselSlides.map((slide, index) => (
          <View
            key={slide.id}
            style={[styles.dot, index === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}
