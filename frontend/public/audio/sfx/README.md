# 効果音ファイル配置ディレクトリ

以下の効果音ファイルを配置してください：

## 必要な効果音ファイル
- push_button.mp3 - 共通ボタン押下音（Push button）

## 推奨仕様
- フォーマット: MP3
- ビットレート: 128kbps以上
- 長さ: 0.1-2秒程度（短い効果音）
- 音量: 統一されたレベル
- サンプリングレート: 44.1kHz

## ファイル配置例
```
public/audio/sfx/
└── push_button.mp3
```

## 使用例
```tsx
import { SFXButton } from '@/components/ui/SFXButton';
import { useButtonSFX } from '@/hooks/useButtonSFX';

// 効果音付きボタン（デフォルトで効果音あり）
<SFXButton onClick={handleClick}>
  クリック
</SFXButton>

// 効果音なしボタン
<SFXButton sfxType="none" onClick={handleClick}>
  サイレント
</SFXButton>

// 既存ボタンに共通効果音を追加
const { playButtonSound } = useButtonSFX();
<button onClick={() => {
  playButtonSound();
  handleClick();
}}>
  クリック
</button>
```

