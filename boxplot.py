import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt


df = pd.read_csv('Smartphone.csv')

plt.figure(figsize=(8, 6))

sns.boxplot(y=df['Work_Productivity_Score'])

plt.ylabel('Productivity Score')
plt.title('Work Productivity Score - Box Plot')
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()