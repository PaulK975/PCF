import * as React from 'react';
import { Label } from '@fluentui/react-components';

export type LabelAlignment = 'left' | 'center' | 'right';

export interface ILabelControlProps {
  name?: string;
  alignment?: LabelAlignment;
  showDivider?: boolean;
  dividerColor?: string;
  marginTop?: boolean;
  isSubsection?: boolean;
}

export class LabelControl extends React.Component<ILabelControlProps> {
  private containerRef = React.createRef<HTMLLabelElement>();

  public componentDidMount(): void {
    this.disableRowPreviewMinHeight();
  }

  public componentDidUpdate(): void {
    this.disableRowPreviewMinHeight();
  }

  private disableRowPreviewMinHeight(): void {
    const rowContainer = this.containerRef.current?.closest<HTMLElement>('[data-preview_orientation="row"]');
    if (rowContainer) {
      rowContainer.style.setProperty('min-height', '0', 'important');
    }
  }

  public render(): React.ReactNode {
    const alignment = this.props.alignment ?? 'left';
    const marginTop = this.props.marginTop ? '4px' : undefined;
    const fontSize = this.props.isSubsection ? '13px' : '14px';
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginTop }}>
        <Label
          ref={this.containerRef}
          role="heading"
          style={{ width: '100%', display: 'block', textAlign: alignment, fontSize, fontWeight: '600', padding: '0px', margin: '0px'}}
        >
          {this.props.name}
        </Label>
        {this.props.showDivider && (
          <hr style={{ width: '100%', margin: '4px 0 0', border: 'none', borderTop: `1px solid ${this.props.dividerColor ?? '#e0e0e0'}` }} />
        )}
      </div>
    )
  }
}
