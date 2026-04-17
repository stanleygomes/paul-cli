import boxen from 'boxen';
import chalk from 'chalk';

export class BannerRender {
  public static render(subtitle: string): void {
    const title = chalk.cyan.bold('PAUL');
    const version = chalk.dim('v1.0.0');

    const content = `${title} ${version}\n  ${chalk.dim(subtitle)}`;

    console.log(
      boxen(content, {
        borderColor: 'magenta',
        padding: { top: 0, bottom: 0, left: 0, right: 0 },
        margin: 1,
        borderStyle: 'round',
        textAlignment: 'center',
      }),
    );
  }
}
