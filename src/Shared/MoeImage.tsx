/*
 * @Author: guoxiaoyang <xiaoyang@moego.pet>
 * @Date: 2022-02-10 15:45:32
 * @LastEditTime: 2022-02-10 15:56:10
 * @LastEditors: guoxiaoyang
 * @FilePath: /react-navigation/example/src/Shared/MoeImage.tsx
 */

import React, { memo, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

export interface MoeImageProps extends TouchableOpacityProps {
  size: number;
  sourceUri: string;
}

export const MoeImage = memo<MoeImageProps>(
  ({ size, style, sourceUri, ...props }) => {
    const [load, setLoad] = useState<'done' | 'fail' | 'progress'>('done');
    useEffect(() => {
      setLoad('done');
    }, [sourceUri]);
    const isFine = load !== 'fail';
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: '#444',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: '#fff',
          },
          { width: size, height: size, borderRadius: size / 2 },
          style,
        ]}
        {...props}
      >
        <Image
          source={isFine ? { uri: sourceUri } : 1}
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: 1,
          }}
          onLoadStart={isFine ? () => setLoad('progress') : void 0}
          onLoad={isFine ? () => setLoad('done') : void 0}
          onError={isFine ? () => setLoad('fail') : void 0}
        />
        {load === 'progress' && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: size - 2,
              height: size - 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            color="#999999"
          />
        )}
      </TouchableOpacity>
    );
  }
);
